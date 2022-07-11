import React, { createContext, ReactNode, RefObject, useEffect } from "react";
import Box from "@mui/material/Box";
import { EChartsType } from "echarts/core";
import { useAnalyzeUserContext } from "./context";
import { useHistory } from "@docusaurus/router";

export interface ChartWrapperProps {
  title?: string
  description?: string
  href?: string
  children: ReactNode
  chart?: RefObject<EChartsType>
  repo?: boolean
}

export interface ChartWrapperContextProps {
  title?: string
  description?: string
  href?: string
}

function ChartWrapper ({ title, description, href, chart, repo, children }: ChartWrapperProps) {
  const { userId } = useAnalyzeUserContext()
  const history = useHistory()

  useEffect(() => {
    chart?.current?.dispatchAction({
      type: 'dataZoom',
      start: 0,
      end: 100,
    })
  }, [userId])

  useEffect(() => {
    if (!repo) {
      return
    }
    if (chart?.current) {
      const clickHandler = params => {
        let name: string
        if (/[xy]Axis/.test(params.componentType)) {
          name = params.value
        } else {
          name = params.name
        }
        if (/^[^\/]+\/[^\/]+$/.test(name)) {
          history.push(`/analyze/${name}`)
        }
      }
      chart.current.on('click', clickHandler)

      return () => {
        chart.current?.off('click', clickHandler)
      }
    }
  }, [repo])

  return (
    <Box sx={{ mb: 4 }}>
      <ChartWrapperContext.Provider value={{title, description, href}}>
        {children}
      </ChartWrapperContext.Provider>
    </Box>
  )
}

export const ChartWrapperContext = createContext<ChartWrapperContextProps>({
})

export default ChartWrapper
