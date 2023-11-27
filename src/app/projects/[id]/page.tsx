'use client'

import { handleCreateTask } from '@/api/create-task'
import { useListProjects } from '@/hooks/useListProjects'
import { useListTags } from '@/hooks/useListTags'
import { AppError } from '@/lib/app-error'
import { SidebarComponent } from '@/ui/sidebar.component'
import { createTaskValidator } from '@/validators/create-task.validator'
import {
  Box,
  useColorModeValue,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
  Text,
  Select,
  Stack,
  Checkbox,
  Textarea
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useParams } from 'next/navigation';

export type CreateTaskProps = {
  title: string;
  description: string;
  status: string;
  tagIds: number[];
}

export default function ProjectScreen() {
  const { handlePage, listProjects, totalPages } = useListProjects();
  const [page, setPage] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const { listTags } = useListTags();
  const [ isLoading, setIsLoading ] = useState(false);
  const toast = useToast();
  const { id } = useParams();

  const { control, handleSubmit, formState: { errors } } = useForm<CreateTaskProps>({
    resolver: yupResolver(createTaskValidator as any)
  });



useEffect(() => {

}, [id]);

  const onSubmit = async (data: CreateTaskProps) => {
    setIsLoading(true);
    try {
      await handleCreateTask(+id, data);
      toast({
        title: 'Tarefa criada com sucesso',
        duration: 9000,
        isClosable: true,
        colorScheme: 'blue',
        position: 'top'
    }) 
      onClose()
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Não foi possível criar a tarefa, Tente novamente mais tarde";
      setIsLoading(false);
      toast({
          title,
          duration: 9000,
          isClosable: true,
          colorScheme: 'red',
          position: 'top'
      }) 
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handlePage(page);
  }, [page]);


  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
       <Box
        position='absolute'
        top={8}
        right={8}
        >
           <Button 
            width={40} 
            backgroundColor='var(--success-100)'
            color='var(--success-500)'
            onClick={onOpen}
            >+ Criar Tarefa
            </Button>
        </Box>
        <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
        >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Criar nova Tarefa</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
          <FormControl mb={8} id="name" isRequired>
          <FormLabel>Titulo da tarefa</FormLabel>
            <Controller
                name="title"
                control={control}
                render={({ field }) => (
                <Input type="text" {...field} />
                )}
            />
                {errors.title && <Text color="red.500">{errors.title.message}</Text>}
            </FormControl>

            <FormControl mb={8} id="description" isRequired>
            <FormLabel>Descrição</FormLabel>
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                    <Textarea {...field} />
                    )}
                />
                {errors.description && <Text color="red.500">{errors.description.message}</Text>}
            </FormControl>

            <FormControl mb={4} id="status">
            <FormLabel>Status</FormLabel>
                <Controller
                    name="status"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Select onChange={onChange} value={value} isRequired name='status' placeholder='Select option'>
                      <option value='PENDENTE'>Pendente</option>
                      <option value='EM_ANDAMENTO'>Em Andamento</option>
                      <option value='CONCLUIDA'>Concluida</option>
                      </Select>
                    )}
                />
                {errors.status && <Text color="red.500">{errors.status.message}</Text>}
            </FormControl>

            <FormControl id="tagIds">
            <FormLabel>Tags</FormLabel>
                <Controller
                    name="tagIds"
                    control={control}
                    render={({ field: { onChange, value }  }) => (
                      <Stack spacing={5} direction='row'>
                        {listTags.tags.map(tag => (
                          <Checkbox
                            onChange={(e) => {
                              const isChecked = e.target.checked;
                              const updatedValue = isChecked
                                ? [...(value || []), tag.id] 
                                : (value || []).filter((id) => id !== tag.id);
                              onChange(updatedValue);
                            }}
                            value={String(value?.includes(tag.id) || false)}
                            isRequired
                            key={tag.id}
                           >
                            {tag.title}
                           </Checkbox>
                        ))}
                    </Stack>
                    )}
                />
                {errors.status && <Text color="red.500">{errors.status.message}</Text>}
            </FormControl>
            



          </ModalBody>

          <ModalFooter>
            <Button 
              colorScheme='blue' 
              mr={3}
              onClick={handleSubmit(onSubmit)}
              isLoading={isLoading}
              >
              Salvar
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <SidebarComponent display={{ base: 'none', md: 'block' }} listProjects={listProjects} />
    </Box>
  )
}

