import React from 'react';
import { useAddonState, useChannel } from '@storybook/manager-api';
import { AddonPanel } from '@storybook/components';
import { ADDON_ID, EVENTS } from './constants';

interface PanelProps {
  active: boolean;
}

export const Panel: React.FC<PanelProps> = props => {
  const [results, setState] = useAddonState(ADDON_ID, {
    danger: [],
    warning: [],
  });

  const emit = useChannel({
    [EVENTS.RESULT]: newResults => setState(newResults),
  });

  return (
    <AddonPanel {...props}>
      <div>
        <pre>
          <code>{results}</code>
        </pre>
      </div>
    </AddonPanel>
  );
};
