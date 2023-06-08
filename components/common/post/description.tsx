import React, { useEffect, useRef, useState } from 'react'
import { Box, Stack } from '@mui/material'
import { Typography } from '@mui/material'

interface DescriptionProps {
  content: string
}

interface ExpandButtonProps {
  isExpand: boolean
  onClick(): void
}

const ExpandButton = ({ isExpand, onClick }: ExpandButtonProps) => {
  return (
    <Stack
      component="span"
      display="inline-flex"
      direction="row"
      columnGap="4px"
      alignItems="center"
      pl="6px"
      pr="4px"
      color={theme => theme.palette.primary.main}
      bgcolor={theme => theme.palette.background.default}
      sx={{ cursor: 'pointer', float: isExpand ? 'right' : 'none' }}
      onClick={onClick}
    >
      <Typography variant="body3">{isExpand ? 'Less' : 'More'}</Typography>
      <Box
        sx={{
          width: 0,
          height: 0,
          borderStyle: 'solid',
          borderWidth: '4.3px 2.5px 0 2.5px',
          borderColor: ' #007bff transparent transparent transparent',
          transform: isExpand
            ? 'rotate(180deg) translateY(-50%)'
            : 'rotate(0deg) translateY(50%)'
        }}
      ></Box>
    </Stack>
  )
}

const NON_EXPAND_HEIGHT = 191

const Description = ({ content }: DescriptionProps) => {
  const containerRef = useRef<HTMLElement>()
  const [isOverflow, setOverflow] = useState(false)
  const [isExpand, setExpand] = useState(false)
  const maxHeight = isExpand ? 'auto' : NON_EXPAND_HEIGHT

  useEffect(() => {
    if (!containerRef.current) return

    const resizeObserver = new ResizeObserver(() => {
      if (!containerRef.current) return
      if (containerRef.current.clientHeight > NON_EXPAND_HEIGHT)
        return setOverflow(true)

      const { scrollHeight, clientHeight } = containerRef.current
      setOverflow(scrollHeight > clientHeight)
      if (scrollHeight === clientHeight) setExpand(false)
    })

    resizeObserver.observe(containerRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <Box
      ref={containerRef}
      position="relative"
      maxHeight={maxHeight}
      overflow="hidden"
      mt="12px"
      sx={{ textOverflow: 'ellipsis' }}
    >
      <Typography
        variant="body2"
        sx={{
          color: theme => theme.palette.light2.main
        }}
      >
        {content}
        {isOverflow && (
          <ExpandButton
            isExpand={isExpand}
            onClick={() => setExpand(isExpand => !isExpand)}
          />
        )}
      </Typography>
      {isOverflow && !isExpand && (
        <Box component="span" position="absolute" right={0} bottom="2px">
          <ExpandButton
            isExpand={isExpand}
            onClick={() => setExpand(isExpand => !isExpand)}
          />
        </Box>
      )}
    </Box>
  )
}

export default Description
