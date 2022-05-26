import Box, { BoxProps } from '@mui/material/Box';
import Stack from '@mui/material/Stack/Stack';
import useThemeContext from '@theme/hooks/useThemeContext';
import React from 'react';
import { combineSx } from '../../utils/mui';
import RepoSelector, { FirstRepoSelector, SecondRepoSelector, Repo } from './RepoSelector';

interface NewCompareHeaderProps extends BoxProps {
  repo1: Repo | null;
  repo2: Repo | null;
  onRepo1Change: (repo: Repo | null) => void;
  onRepo2Change: (repo: Repo | null) => void;
  onRepo1Valid: (repo: Repo | null) => (string | undefined);
  onRepo2Valid: (repo: Repo | null) => (string | undefined);
  repo1DisableClearable?: boolean;
  repo1Placeholder?: string;
  repo2Placeholder?: string;
  sideWidth: string;
}

function NewCompareHeader({
  repo1,
  repo2,
  onRepo1Change,
  onRepo2Change,
  onRepo1Valid,
  onRepo2Valid,
  repo1DisableClearable,
  repo1Placeholder,
  repo2Placeholder,
  sx,
  sideWidth,
  ...props
}: NewCompareHeaderProps) {
  const { isDarkTheme } = useThemeContext();

  return (
    <Box
      position="sticky"
      sx={combineSx({
        my: 0,
        py: 2,
        top: 'var(--ifm-navbar-height)',
        zIndex: 'var(--ifm-z-index-fixed-mui)',
        backgroundColor: 'rgba(112, 112, 112, 10%)',
        ml: sideWidth,
        pl: 4,
        width: `calc(100% - ${sideWidth})`
      }, sx)}
      {...props}
    >
      <Stack direction='row' alignItems='center' flexWrap='wrap'>
        <FirstRepoSelector
          defaultRepoName="recommend-repo-list-1-keyword"
          repo={repo1}
          onChange={onRepo1Change}
          onValid={onRepo1Valid}
          disableClearable={repo1DisableClearable}
        />
        <Box sx={{
          maxWidth: 'min-content',
          px: 1,
          color: '#A3A3A3',
          fontWeight: 'bolder',
          fontSize: 20,
        }}>
          VS.
        </Box>

        <SecondRepoSelector
          placeholder='add another one'
          defaultRepoName="recommend-repo-list-2-keyword"
          repo={repo2}
          onChange={onRepo2Change}
          onValid={onRepo2Valid}
        />
      </Stack>
    </Box>
  );
}

export default NewCompareHeader;
