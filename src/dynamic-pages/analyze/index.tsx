import BrowserOnly from '@docusaurus/core/lib/client/exports/BrowserOnly';
import { useHistory, useLocation, useRouteMatch } from '@docusaurus/router';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import {
  CodeIcon,
  GitCommitIcon,
  IssueOpenedIcon,
  LinkExternalIcon,
  PeopleIcon,
  RepoForkedIcon,
  StarIcon,
} from '@primer/octicons-react';
import React, { useCallback, useMemo, useState } from 'react';
import Analyze from '../../analyze-charts/Analyze';
import { DurationChart } from '../../analyze-charts/common-duration';
import { CompaniesChart } from '../../analyze-charts/companies';
import { AnalyzeContext } from '../../analyze-charts/context';
import { TimeHeatChart } from '../../analyze-charts/heatmap';
import { IssueChart } from '../../analyze-charts/issue';
import { LineChart } from '../../analyze-charts/line';
import List from '../../analyze-charts/list/List';
import { LocChart } from '../../analyze-charts/loc';
import { PrChart } from '../../analyze-charts/pr';
import { PushesAndCommitsChart } from '../../analyze-charts/push-and-commits';
import Summary, { SummaryProps } from '../../analyze-charts/summary';
import { WorldMapChart } from '../../analyze-charts/worldmap';
import { RepoInfo, useRepo } from '../../api/gh';
import CompareHeader from '../../components/CompareHeader/CompareHeader';
import { Repo } from '../../components/CompareHeader/RepoSelector';
import { AsyncData } from '../../components/RemoteCharts/hook';
import ShareButtons from '../../components/ShareButtons';
import TryItYourself from '../../components/TryItYourself';
import useUrlSearchState, { stringParam } from '../../hooks/url-search-state';
import { alpha2ToTitle } from '../../lib/areacode';
import CustomPage from '../../theme/CustomPage';
import Section from './Section';
import { H1, H2, H3, H4, P2 } from './typography';

interface AnalyzePageParams {
  owner: string;
  repo: string;
}

function AnalyzePage() {
  const history = useHistory()
  const location = useLocation()

  const {data: main, name} = useMainRepo();
  const {data: vs, name: comparingRepoName, setName: setComparingRepoName} = useVsRepo()

  const onRepoChange = useCallback((repo: Repo) => {
    history.push({
      pathname: `/analyze/${repo.name}`,
      search: location.search
    })
  }, [history, location])

  const onComparingRepoChange = useCallback((repo: Repo | undefined) => {
    setComparingRepoName(repo?.name)
  }, [])

  const allValid = useCallback(() => undefined, [])

  // hooks for sections
  const [mapType, setMapType] = useState('stars-map')
  const handleChangeMapType = useCallback((event:  React.SyntheticEvent, value: string) => {
    setMapType(value)
  }, [])

  const [companyType, setCompanyType] = useState('analyze-stars-company')
  const handleChangeCompanyType = useCallback((event:  React.SyntheticEvent, value: string) => {
    setCompanyType(value)
  }, [])

  const summaries: SummaryProps['items'] = useMemo(() => {
    return [{
      icon: <StarIcon fill='#FAC858'/>,
      title: 'Stars',
      query: 'stars-total',
      field: '*'
    },{
      icon: <GitCommitIcon fill='#D54562'/>,
      title: 'Commits',
      query: 'commits-total',
      field: '*'
    },{
      icon: <IssueOpenedIcon fill='#FDE494'/>,
      title: 'Issues',
      query: 'issues-total',
      field: '*'
    },{
      icon: <RepoForkedIcon fill='#E30C34'/>,
      title: 'Forks',
      data: repoInfo => repoInfo.forks,
    },{
      icon: <PeopleIcon fill='#F77C00'/>,
      title: 'PR Creators',
      query: 'pull-request-creators-total ',
      field: '*'
    },{
      icon: <CodeIcon fill='#309CF2'/>,
      title: 'Language',
      data: repoInfo => repoInfo.language,
    }]
  }, [])

  const issuesSummaries: SummaryProps['items'] = useMemo(() => {
    return [
      {title: 'Total issues', query: "issues-total", field: '*'},
      {title: 'Total issue creators', query: 'issue-creators-total', field: '*'},
      {title: 'Total issue comments', query: 'issue-comments-total', field: '*'},
      {title: 'Total issue commenters', query: 'issue-commenters-total', field: '*'},
    ]
  }, [])

  const prSummaries: SummaryProps['items'] = useMemo(() => {
    return [
      {title: 'Total PRs', query: "pull-requests-total", field: '*'},
      {title: 'Total PR creators', query: "pull-request-creators-total", field: '*'},
      {title: 'Total PR reviews', query: "pull-request-reviews-total", field: '*'},
      {title: 'Total PR reviewers', query: "pull-request-reviewers-total", field: '*'},
    ]
  }, [])

  const commonAspectRatio = vs ? 16 / 9 : 20 / 9

  return (
    <CustomPage>
      <AnalyzeContext.Provider value={{
        repoId: main?.repo.id,
        comparingRepoId: vs?.repo.id,
        repoName: name,
        comparingRepoName,
        repoInfo: main?.repoInfo,
        comparingRepoInfo: vs?.repoInfo,
      }}>
        <CompareHeader
          repo1={main?.repo}
          repo2={vs?.repo}
          onRepo1Change={onRepoChange}
          onRepo2Change={onComparingRepoChange}
          onRepo1Valid={allValid}
          onRepo2Valid={allValid}
          repo1DisableClearable
        />

        <Container maxWidth='lg'>
          <Section>
            {
              comparingRepoName ? undefined : (
                <H1 sx={{ mt: 6 }}>
                  <a href={`https://github.com/${name}`} target="_blank">
                    {name}
                    &nbsp;
                    <LinkExternalIcon size={28} verticalAlign="middle" />
                  </a>
                </H1>
              )
            }
            <ShareButtons title='OSSInsight analyze' />
            <Grid container spacing={2} alignItems='center'>
              <Grid item xs={12} md={vs ? 8 : 6}>
                <Summary items={summaries} />
              </Grid>
              <Grid item xs={12} md={vs ? 4 : 6}>
                <Analyze query='stars-history'>
                  <H2 analyzeTitle display='none'>Stars History</H2>
                  <LineChart spec={{valueIndex: 'total', name: 'Stars', fromRecent: true}}/>
                </Analyze>
              </Grid>
            </Grid>
          </Section>
          <Section>
            <H2>Commits</H2>
            <Analyze query='analyze-pushes-and-commits-per-month'>
              <H3 sx={{ mt: 6 }}>Commits & Pushes History</H3>
              <P2>
              The trend of the total number of commits/pushes per month in a repository since it was created.
                <br />
              * Note: A push action can include multiple commit actions.
              </P2>
              <PushesAndCommitsChart aspectRatio={commonAspectRatio} />
            </Analyze>
            <Analyze query='analyze-loc-per-month'>
              <H3 sx={{ mt: 6 }}>Lines of code changed</H3>
              <P2>
                The bars show the additions or deletions of code monthly.
                <br />
                The line chart demonstrate the total lines of code (additions + deletions).
              </P2>
              <LocChart aspectRatio={commonAspectRatio} />
            </Analyze>
            <Analyze query='commits-time-distribution'>
              <H3 sx={{ mt: 6 }}>Commits Time Distribution</H3>
              <P2>
                The Heat Maps below describe the number of commit events that occur at a particular point of time (UTC+0).
              </P2>
              <Grid container>
                <Grid item xs={12} md={vs ? 12 : 6}>
                  <TimeHeatChart aspectRatio={vs ? (24 / 7) : (24 / 14)}/>
                </Grid>
              </Grid>
            </Analyze>
          </Section>
          <Section>
            <H2>Pull Requests</H2>
            <Grid container spacing={2} alignItems='center'>
              <Grid item xs={12} md={vs ? 8 : 6}>
                <Summary items={prSummaries} />
              </Grid>
            </Grid>
            <Analyze query='analyze-pull-requests-size-per-month'>
              <H3 sx={{ mt: 6 }}>Pull Request History</H3>
              <P2>
               We divide the size of Pull Request into six intervals, from xs to xxl（based on the changes of code lines）. Learn more about
                &nbsp;
                <a href='https://github.com/kubernetes/kubernetes/labels?q=size' target='_blank'>
                  PR size
                </a>.
              </P2>
              <PrChart aspectRatio={commonAspectRatio} />
            </Analyze>
            <Analyze query='analyze-pull-request-open-to-merged'>
              <H3 sx={{ mt: 6 }}>Pull Request Time Cost</H3>
              <P2>
              The time of a Pull Request from submitting to merging. 
              <br />
              p25/p75: 25%/75% Pull Requests are closed within X minute/hour/day.
              <br />
              e.g. p25: 1h means 25% Pull Requests are closed within 1 hour.
              </P2>
              <DurationChart aspectRatio={commonAspectRatio} />
            </Analyze>
          </Section>
          <Section>
            <H2>Issues</H2>
            <Grid container spacing={2} alignItems='center'>
              <Grid item xs={12} md={vs ? 8 : 6}>
                <Summary items={issuesSummaries} />
              </Grid>
            </Grid>
            <Analyze query='analyze-issue-open-to-first-responded'>
            <H3 sx={{ mt: 6 }}>Issue Time Cost</H3>
              <P2>
              The time of an issue from open to close. 
              <br />
              p25/p75: 25%/75% issues are closed within X minute/hour/day.
              <br />
              e.g. p25: 1h means 25% issues are closed within 1 hour.
              </P2>
              <DurationChart aspectRatio={commonAspectRatio} />
            </Analyze>
            <Analyze query='analyze-issue-opened-and-closed'>
              <H3 sx={{ mt: 6 }}>Issue History</H3>
              <IssueChart aspectRatio={commonAspectRatio} />
            </Analyze>
          </Section>
          <Section>
            <H2>People</H2>
            <Analyze query={mapType}>
              <H3 analyzeTitle={false} sx={{ mt: 6 }}>Geographical Distribution</H3>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={mapType} onChange={handleChangeMapType}>
                  <Tab sx={{ textTransform: 'unset' }} label={<H4>Stargazers</H4>} value='stars-map' />
                  <Tab sx={{ textTransform: 'unset' }} label={<H4>Issue Creators</H4>} value='issue-creators-map' />
                  <Tab sx={{ textTransform: 'unset' }} label={<H4>Pull Requests Creators</H4>} value='pull-request-creators-map' />
                </Tabs>
              </Box>
              <Grid container alignItems='center'>
                <Grid item xs={12} md={vs ? 8 : 9}>
                  <WorldMapChart />
                </Grid>
                <Grid item xs={12} md={vs ? 4 : 3}>
                  <List title='Geo-Locations' n={10} /* valueIndex='count' */ nameIndex='country_or_area' percentIndex='percentage' transformName={alpha2ToTitle} />
                </Grid>
              </Grid>
            </Analyze>
            <Analyze query={companyType} params={{limit: comparingRepoName ? 25 : 50}}>
              <H3 analyzeTitle={false} sx={{ mt: 6 }}>Companies</H3>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={companyType} onChange={handleChangeCompanyType}>
                  <Tab sx={{ textTransform: 'unset' }} label={<H4>Stargazers</H4>} value='analyze-stars-company' />
                  <Tab sx={{ textTransform: 'unset' }} label={<H4>Issue Creators</H4>} value='analyze-issue-creators-company' />
                  <Tab sx={{ textTransform: 'unset' }} label={<H4>Pull Requests Creators</H4>} value='analyze-pull-request-creators-company' />
                </Tabs>
              </Box>
              <Grid container alignItems='center'>
                <Grid item xs={12} md={vs ? 8 : 9}>
                  <CompaniesChart spec={{valueIndex: companyValueIndices[companyType]}} />
                </Grid>
                <Grid item xs={12} md={vs ? 4 : 3}>
                  <List title='Companies' n={10} /* valueIndex={companyValueIndices[companyType]} */ nameIndex='company_name' percentIndex='proportion' />
                </Grid>
              </Grid>
            </Analyze>
          </Section>
          <TryItYourself campaign='compare' show fixed/>
        </Container>
      </AnalyzeContext.Provider>
    </CustomPage>
  );
}

export default () => <BrowserOnly>{() => <AnalyzePage />}</BrowserOnly>

const companyValueIndices = {
  'analyze-stars-company': 'stargazers',
  'analyze-issue-creators-company': 'issue_creators',
  'analyze-pull-request-creators-company': 'code_contributors'
}

type InfoPack = {
  repoInfo: RepoInfo
  repo: Repo
}

function toRepo (repo: RepoInfo | undefined): InfoPack | undefined {
  return repo ? {
    repoInfo: repo,
    repo: {
      id: repo.id,
      name: repo.full_name,
      color: ''
    }
  } : undefined
}

function useMainRepo (): AsyncData<InfoPack> & {name: string} {
  let {params: {owner, repo: repoName}} = useRouteMatch<AnalyzePageParams>();
  const name = `${owner}/${repoName}`
  const {data: repo, isValidating, error} = useRepo(name);

  return {
    data: toRepo(repo),
    loading: isValidating,
    error,
    name,
  }
}

function useVsRepo (): AsyncData<InfoPack> & {name: string, setName: (val: string|undefined) => void} {
  const [vs, setVs] = useUrlSearchState('vs', stringParam())

  const {data: repo, isValidating, error} = useRepo(vs)
  return {
    data: toRepo(repo),
    loading: isValidating,
    error,
    name: vs,
    setName: setVs
  }
}
