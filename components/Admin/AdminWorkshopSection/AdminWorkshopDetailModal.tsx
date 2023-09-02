import { useApproveWorkshop, useGetWorkshop } from '@network/queries'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Skeleton } from '@nextui-org/react'

interface AdminWorkshopDetailModal {
  id: string
  isOpen: boolean
  onOpenChange: () => void
  onClose: () => void
}

export const AdminWorkshopDetailModal = ({
  id,
  isOpen,
  onOpenChange,
  onClose
}: AdminWorkshopDetailModal) => {
  const { data: workshopDetailResp, isFetched } = useGetWorkshop(id, isOpen)
  const { mutateAsync: approve, isLoading } = useApproveWorkshop({
    onSuccess: resp => {
      console.log('onSuccess: ', resp)
      onClose()
    },
    onError: error => {
      console.error('onError: ', error)
    }
  })

  const onApprove = async () => {
    await approve(id)
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size='xl'
      backdrop='blur'
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: 'easeOut',
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: 'easeIn',
            },
          },
        }
      }}
    >
      <ModalContent>
        <ModalHeader>
          <Skeleton className='h-6 w-40 rounded-full' isLoaded={isFetched}>
            {workshopDetailResp?.topic}
          </Skeleton>
        </ModalHeader>
        <ModalBody>
          {isFetched ? (
            <p>
              {workshopDetailResp?.description}
            </p>
          ) : (
            <>
              <Skeleton className='h-4 w-full rounded-full' />
              <Skeleton className='h-4 w-full rounded-full' />
              <Skeleton className='h-4 w-60 rounded-full' />
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onPress={onApprove} isLoading={isLoading} isDisabled={!isFetched}>
            Approve
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
