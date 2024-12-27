import '@testing-library/jest-dom';

// Mock window.matchMedia
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      //   event와 _callback 매개변수가 의도적으로 사용되지 않음
      addEventListener: function (_event: string, _callback: () => void) {
        // EventListener 구현
      },
      removeEventListener: function (_event: string, _callback: () => void) {
        // EventListener 제거 구현
      },
    };
  };
