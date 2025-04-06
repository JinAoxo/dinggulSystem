import React, { useState } from 'react';
import { Button } from './Button';
import './markup-guide.scss';

export const MarkupGuide = () => {
  const [outputFormat, setOutputFormat] = useState('html');
  const [selectedComponents, setSelectedComponents] = useState({
    button: false,
    // 추후 다른 컴포넌트 추가 가능
  });
  const [selectedOptions, setSelectedOptions] = useState({
    sizes: {
      xs: false,
      sm: false,
      md: false,
      lg: false,
      full: false
    },
    styles: {
      primary: false,
      default: false,
      'outline-primary': false,
      'outline-default': false,
      'tonal': false,
      'secondary': false,
      'outline-tonal': false,
      'outline-secondary': false
    },
    features: {
      icon: false,
      segment: false
    },
    newWindow: false,
  });

  const handleComponentChange = (component) => {
    setSelectedComponents(prev => ({
      ...prev,
      [component]: !prev[component]
    }));
  };

  const handleOptionChange = (category, option) => {
    setSelectedOptions(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [option]: !prev[category][option]
      }
    }));
  };

  const getSizeDescription = (size) => {
    switch (size) {
      case 'xs': return '텍스트 중간, 끝';
      case 'sm': return '콘텐츠 내 문단 위/아래';
      case 'md': return '테이블, 입력폼 필드 내부';
      case 'lg': return '페이지 주요 액션 (게시판 하단 등)';
      case 'full': return '너비 100% 버튼';
      default: return '';
    }
  };

  const generateButtonMarkup = () => {
    let markup = '';
    const selectedSizes = Object.entries(selectedOptions.sizes)
      .filter(([_, selected]) => selected)
      .map(([size]) => size);
    
    const selectedStyles = Object.entries(selectedOptions.styles)
      .filter(([_, selected]) => selected)
      .map(([style]) => style);

    if (selectedSizes.length === 0 || selectedStyles.length === 0) {
      return '<!-- 사이즈와 스타일을 선택해주세요 -->';
    }

    // HTML 가이드 추가
    markup += `<!-- 버튼 컴포넌트 가이드 -->
<!-- 1. a, button 태그만 사용 (input 지양) -->
<!-- 2. [웹접근성] 새창 제공 링크에 target="_blank" title="새창" 필수 -->
<!-- 3. 버튼 내 아이콘 추가 시 간격은 mr-1(좌측 배치) 또는 ml-1(우측 배치) 사용 -->\n\n`;
    
    // 기본 버튼 스타일
    selectedSizes.forEach(size => {
      if (size === 'full') return; // Skip full size buttons here
      
      markup += `<!-- .btn-${size} : ${getSizeDescription(size)} -->\n`;
      markup += '<div class="btn-group">\n';
      
      selectedStyles.forEach(style => {
        const classes = ['btn', `btn-${size}`];
        if (style.startsWith('outline-')) {
          classes.push(`btn-${style}`);
        } else {
          classes.push(`btn-${style}`);
        }
        
        if (size === 'full') {
          classes.push('btn-full');
        }

        const buttonText = `${style} ${size}`;
        
        switch (outputFormat) {
          case 'html':
            markup += selectedOptions.newWindow 
              ? `  <button type="button" class="${classes.join(' ')}" target="_blank" title="새창">${buttonText}</button>\n`
              : `  <button type="button" class="${classes.join(' ')}">${buttonText}</button>\n`;
            break;
          case 'react':
            markup += `  <Button\n    variant="${style}"\n    size="${size}"${selectedOptions.newWindow ? '\n    isNewWindow={true}' : ''}\n    label="${buttonText}"\n  />\n`;
            break;
          case 'vue':
            markup += `  <Button\n    :variant="'${style}'"\n    :size="'${size}'"${selectedOptions.newWindow ? '\n    :is-new-window="true"' : ''}\n    :label="'${buttonText}'"\n  />\n`;
            break;
        }
      });
      
      markup += '</div>\n\n';
    });

    // 전체 너비 버튼 섹션
    if (selectedOptions.sizes.full) {
      markup += `<!-- .btn-full : ${getSizeDescription('full')} -->\n`;
      markup += '<div class="btn-group">\n';
      
      selectedStyles.forEach(style => {
        const classes = ['btn', 'btn-lg', 'btn-full'];
        if (style.startsWith('outline-')) {
          classes.push(`btn-${style}`);
        } else {
          classes.push(`btn-${style}`);
        }

        const buttonText = `${style} full`;
        
        switch (outputFormat) {
          case 'html':
            markup += selectedOptions.newWindow 
              ? `  <button type="button" class="${classes.join(' ')}" target="_blank" title="새창">${buttonText}</button>\n`
              : `  <button type="button" class="${classes.join(' ')}">${buttonText}</button>\n`;
            break;
          case 'react':
            markup += `  <Button\n    variant="${style}"\n    size="lg"\n    isFull={true}${selectedOptions.newWindow ? '\n    isNewWindow={true}' : ''}\n    label="${buttonText}"\n  />\n`;
            break;
          case 'vue':
            markup += `  <Button\n    :variant="'${style}'"\n    :size="'lg'"\n    :is-full="true"${selectedOptions.newWindow ? '\n    :is-new-window="true"' : ''}\n    :label="'${buttonText}'"\n  />\n`;
            break;
        }
      });
      
      markup += '</div>\n\n';
    }

    // 추가 버튼 스타일 섹션
    if (selectedOptions.features.icon || selectedOptions.features.segment || selectedOptions.newWindow) {
      markup += '<!-- 그외 추가 버튼 스타일 -->\n';
      markup += '<div class="btn-group">\n';

      // 아이콘만 있는 버튼
      if (selectedOptions.features.icon) {
        switch (outputFormat) {
          case 'html':
            markup += '  <!-- 아이콘만 있는 버튼 -->\n';
            markup += '  <button type="button" class="btn btn-md btn-icon">\n    <i class="ico ico-check"></i>\n  </button>\n';
            markup += '  <button type="button" class="btn btn-md btn-primary btn-icon">\n    <i class="ico ico-check"></i>\n  </button>\n';
            markup += '  <!-- 아이콘이 추가된 버튼 -->\n';
            markup += '  <button type="button" class="btn btn-md btn-default">\n    <i class="ico ico-check mr-1"></i>\n    아이콘 버튼\n  </button>\n';
            markup += '  <button type="button" class="btn btn-md btn-primary">\n    <i class="ico ico-check mr-1"></i>\n    아이콘 버튼\n  </button>\n';
            break;
          case 'react':
            markup += '  {/* 아이콘만 있는 버튼 */}\n';
            markup += '  <Button variant="default" size="md" icon="check" isIconOnly={true} />\n';
            markup += '  <Button variant="primary" size="md" icon="check" isIconOnly={true} />\n';
            markup += '  {/* 아이콘이 추가된 버튼 */}\n';
            markup += '  <Button variant="default" size="md" icon="check" label="아이콘 버튼" />\n';
            markup += '  <Button variant="primary" size="md" icon="check" label="아이콘 버튼" />\n';
            break;
          case 'vue':
            markup += '  <!-- 아이콘만 있는 버튼 -->\n';
            markup += '  <Button :variant="\'default\'" :size="\'md\'" :icon="\'check\'" :is-icon-only="true" />\n';
            markup += '  <Button :variant="\'primary\'" :size="\'md\'" :icon="\'check\'" :is-icon-only="true" />\n';
            markup += '  <!-- 아이콘이 추가된 버튼 -->\n';
            markup += '  <Button :variant="\'default\'" :size="\'md\'" :icon="\'check\'" :label="\'아이콘 버튼\'" />\n';
            markup += '  <Button :variant="\'primary\'" :size="\'md\'" :icon="\'check\'" :label="\'아이콘 버튼\'" />\n';
            break;
        }
      }

      // 세그먼트 버튼
      if (selectedOptions.features.segment) {
        switch (outputFormat) {
          case 'html':
            markup += '  <!-- 세그먼트 버튼 -->\n';
            markup += '  <button type="button" class="btn btn-md btn-segment">세그먼트1</button>\n';
            markup += '  <button type="button" class="btn btn-md btn-segment is-active">세그먼트2</button>\n';
            markup += '  <button type="button" class="btn btn-md btn-segment">세그먼트3</button>\n';
            break;
          case 'react':
            markup += '  {/* 세그먼트 버튼 */}\n';
            markup += '  <Button variant="default" size="md" isSegment={true} label="세그먼트1" />\n';
            markup += '  <Button variant="default" size="md" isSegment={true} isSegmentActive={true} label="세그먼트2" />\n';
            markup += '  <Button variant="default" size="md" isSegment={true} label="세그먼트3" />\n';
            break;
          case 'vue':
            markup += '  <!-- 세그먼트 버튼 -->\n';
            markup += '  <Button :variant="\'default\'" :size="\'md\'" :is-segment="true" :label="\'세그먼트1\'" />\n';
            markup += '  <Button :variant="\'default\'" :size="\'md\'" :is-segment="true" :is-segment-active="true" :label="\'세그먼트2\'" />\n';
            markup += '  <Button :variant="\'default\'" :size="\'md\'" :is-segment="true" :label="\'세그먼트3\'" />\n';
            break;
        }
      }

      // 새창으로 열기 버튼
      if (selectedOptions.newWindow) {
        switch (outputFormat) {
          case 'html':
            markup += '  <!-- 새창으로 열기 버튼 -->\n';
            markup += '  <button type="button" class="btn btn-md btn-default" target="_blank" title="새창">\n    새창으로 열기\n    <i class="ico ico-external-link ml-1"></i>\n  </button>\n';
            break;
          case 'react':
            markup += '  {/* 새창으로 열기 버튼 */}\n';
            markup += '  <Button variant="default" size="md" isNewWindow={true} icon="external-link" label="새창으로 열기" />\n';
            break;
          case 'vue':
            markup += '  <!-- 새창으로 열기 버튼 -->\n';
            markup += '  <Button :variant="\'default\'" :size="\'md\'" :is-new-window="true" :icon="\'external-link\'" :label="\'새창으로 열기\'" />\n';
            break;
        }
      }

      markup += '</div>\n';
    }

    return markup;
  };

  return (
    <div className="markup-guide">
      <div className="guide-section">
        <h3 className="title-guide">
          마크업 가이드 생성기
          <i className="badge"></i>
        </h3>

        <div className="guide-controls">
          {/* 1. 출력 형식 선택 */}
          <div className="format-selector mb-md">
            <h4>1. 출력 형식 선택</h4>
            <select 
              value={outputFormat} 
              onChange={(e) => setOutputFormat(e.target.value)}
            >
              <option value="html">HTML</option>
              <option value="react">React</option>
              <option value="vue">Vue</option>
            </select>
          </div>

          {/* 2. 컴포넌트 선택 */}
          <div className="component-selector mb-md">
            <h4>2. 컴포넌트 가이드 선택</h4>
            <div className="option-group">
              <label>
                <input
                  type="checkbox"
                  checked={selectedComponents.button}
                  onChange={() => handleComponentChange('button')}
                />
                버튼 컴포넌트
              </label>
              {/* 추후 다른 컴포넌트 체크박스 추가 가능 */}
            </div>
          </div>

          {/* 3. 선택된 컴포넌트별 옵션 */}
          {selectedComponents.button && (
            <div className="component-options">
              <h4>3. 버튼 옵션 선택</h4>
              <div className="options-section">
                <div className="option-group">
                  <h5>사이즈 선택</h5>
                  {Object.keys(selectedOptions.sizes).map(size => (
                    <label key={size}>
                      <input
                        type="checkbox"
                        checked={selectedOptions.sizes[size]}
                        onChange={() => handleOptionChange('sizes', size)}
                      />
                      .btn-{size} ({getSizeDescription(size)})
                    </label>
                  ))}
                </div>

                <div className="option-group">
                  <h5>스타일 선택</h5>
                  {Object.keys(selectedOptions.styles).map(style => (
                    <label key={style}>
                      <input
                        type="checkbox"
                        checked={selectedOptions.styles[style]}
                        onChange={() => handleOptionChange('styles', style)}
                      />
                      .btn-{style}
                    </label>
                  ))}
                </div>

                <div className="option-group">
                  <h5>기능 선택</h5>
                  {Object.keys(selectedOptions.features).map(feature => (
                    <label key={feature}>
                      <input
                        type="checkbox"
                        checked={selectedOptions.features[feature]}
                        onChange={() => handleOptionChange('features', feature)}
                      />
                      {feature === 'icon' ? '아이콘 포함' : '세그먼트 버튼'}
                    </label>
                  ))}
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedOptions.newWindow}
                      onChange={() => setSelectedOptions(prev => ({
                        ...prev,
                        newWindow: !prev.newWindow
                      }))}
                    />
                    새창으로 열기
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 4. 미리보기 및 코드 출력 */}
        {selectedComponents.button && (
          <>
            <div className="preview-section">
              <div className="preview-buttons">
                {Object.entries(selectedOptions.sizes)
                  .filter(([_, selected]) => selected)
                  .map(([size]) => (
                    <div key={size} className="size-group">
                      <p className="mt-md mb-sm">.btn-{size} : {getSizeDescription(size)}</p>
                      <div className="btn-group text-left mt-0">
                        {Object.entries(selectedOptions.styles)
                          .filter(([_, selected]) => selected)
                          .map(([style]) => (
                            <Button
                              key={`${size}-${style}`}
                              variant={style}
                              size={size}
                              label={`${style} ${size}`}
                              isNewWindow={selectedOptions.newWindow}
                            />
                          ))}
                      </div>
                    </div>
                  ))}

                {/* 그외 추가 버튼 스타일 프리뷰 */}
                {(selectedOptions.features.icon || selectedOptions.features.segment || selectedOptions.newWindow) && (
                  <div className="size-group">
                    <p className="mt-md mb-sm">그외 추가 버튼 스타일</p>
                    <div className="btn-group text-left mt-0">
                      {selectedOptions.features.icon && (
                        <>
                          {/* 아이콘만 있는 버튼 */}
                          <Button
                            variant="default"
                            size="md"
                            icon="check"
                            isIconOnly={true}
                          />
                          <Button
                            variant="primary"
                            size="md"
                            icon="check"
                            isIconOnly={true}
                          />
                          {/* 아이콘이 추가된 버튼 */}
                          <Button
                            variant="default"
                            size="md"
                            icon="check"
                            label="아이콘 버튼"
                          />
                          <Button
                            variant="primary"
                            size="md"
                            icon="check"
                            label="아이콘 버튼"
                          />
                        </>
                      )}
                      {selectedOptions.features.segment && (
                        <>
                          <Button
                            variant="default"
                            size="md"
                            isSegment={true}
                            label="세그먼트1"
                          />
                          <Button
                            variant="default"
                            size="md"
                            isSegment={true}
                            isSegmentActive={true}
                            label="세그먼트2"
                          />
                          <Button
                            variant="default"
                            size="md"
                            isSegment={true}
                            label="세그먼트3"
                          />
                        </>
                      )}
                      {selectedOptions.newWindow && (
                        <Button
                          variant="default"
                          size="md"
                          isNewWindow={true}
                          icon="external-link"
                          label="새창으로 열기"
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="code-output">
              <div className="code-header">
                <h4>생성된 코드</h4>
                <button 
                  onClick={() => navigator.clipboard.writeText(generateButtonMarkup())}
                  className="copy-button"
                >
                  복사
                </button>
              </div>
              <div className="code-container">
                <table className="syntax-highlighter">
                  <tbody>
                    <tr>
                      <td className="gutter">
                        {generateButtonMarkup().split('\n').map((_, i) => (
                          <div key={i} className="line-number">{i + 1}</div>
                        ))}
                      </td>
                      <td className="code">
                        <pre>{generateButtonMarkup()}</pre>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}; 