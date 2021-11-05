import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { TAB_OPTIONS } from 'pages/Account/store';

export const useTabCheck = (tabName) => {
  const tab = useSelector(({ userAccount }) => userAccount.tab);

  const isSelected = useMemo(() => {
    const tabIndex = TAB_OPTIONS.findIndex((i) => i === tabName);

    return tabIndex === tab;
  }, [tab, tabName]);

  return isSelected;
};
