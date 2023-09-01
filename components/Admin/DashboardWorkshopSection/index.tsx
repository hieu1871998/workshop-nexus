'use client'

import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { BarList, Flex, Metric, Text, Title } from '@tremor/react'
import { map, orderBy } from 'lodash'

interface DashboardWorkshopSection {
  workshopCounts: {
    total: number,
    approved: number,
    canceled: number,
    completed: number,
    ongoing: number,
    pending: number,
    rejected: number,
  }
}

export const DashboardWorkshopSection = ({
  workshopCounts
}: DashboardWorkshopSection) => {
  const workshopCountsData = orderBy(map(workshopCounts, (value, key) => ({
    name: key.toUpperCase(),
    value,
  })), 'value', 'desc')

  return (
    <section>
      <Card className='max-w-lg mx-auto'>
        <CardHeader>
          <div>
            <Title>Workshops</Title>
            <Flex
              justifyContent='start'
              alignItems='baseline'
              className='space-x-2'
            >
              <Metric>{workshopCounts.total}</Metric>
              <Text>total workshops</Text>
            </Flex>
          </div>
        </CardHeader>
        <CardBody>
          <Flex>
            <Text>Status</Text>
            <Text className='text-right'>Count</Text>
          </Flex>
          <BarList
            className='mt-2'
            data={workshopCountsData}
          />
        </CardBody>
      </Card>
    </section>
  )
}
