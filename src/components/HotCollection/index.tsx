import { RecentHotCollectionData } from "../../pages/home/_sections/1-collections/hook";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Diff from "../Diff";
import Link from "@docusaurus/Link";
import Avatar from "@mui/material/Avatar";
import { paramCase } from "param-case";
import React from "react";
import Skeleton from "@mui/material/Skeleton";

export default function HotCollection({ name, repos, collectionRepos }: Pick<RecentHotCollectionData, 'name' | 'repos' | 'collectionRepos'>) {
  return (
    <Box border="2px dashed #3c3c3c" p={2} borderRadius={1} sx={{ '&:not(:first-child)': { ml: 2 } }}>
      <Typography variant="body1" fontSize={16}>{name}</Typography>
      <Typography variant="body2" color="#7C7C7C" mt={2} mb={2}>{repos} repositories</Typography>

      {collectionRepos.map(repo => (
        <Stack key={repo.repo_id} direction="row" mt={1} alignItems="center">
          <Box maxWidth={48} minWidth={48}>
            {repo.rank}
            <Diff val={repo.rank_changes} />
          </Box>
          <Box overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap'>
            <Link href={`/analyze/${repo.repo_name}`} target='_blank'>
              <Stack direction="row" alignItems="center">
                <Box component='span' display='inline-flex' bgcolor='lightgrey' borderRadius='24px' padding='0px' alignItems='center' justifyContent='center' sx={{ verticalAlign: 'text-bottom'}} mr={1}>
                  <Avatar src={`https://github.com/${repo.repo_name.split('/')[0]}.png`} />
                </Box>
                <Box component="span" whiteSpace="nowrap" ml={1}>
                  {repo.repo_name}
                </Box>
              </Stack>
            </Link>
          </Box>
        </Stack>
      ))}

      <Box mt={2} fontSize={14}>
        <Link href={`/collections/${paramCase(name)}`} target='_blank'>
          &gt; See All
        </Link>
      </Box>
    </Box>
  );
}


export function LoadingHotCollection() {
  return (
    <Box border="2px dashed #3c3c3c" p={2} borderRadius={1} sx={{ '&:not(:first-child)': { ml: 2 } }}>
      <Skeleton width={150} />
      <Skeleton width={160} sx={{ mt: 2 }} />
      <Skeleton width={120} sx={{ my: 2 }} />
      {[0, 1, 2].map(i => (
        <Stack key={i} direction="row">
          <Skeleton width={48} />
          <Skeleton width={36} height={36} variant="circular" sx={{ mx: 1 }} />
          <Skeleton width={120} />
        </Stack>
      ))}
    </Box>
  );
}
