import {
  Box,
  useColorModeValue,
  Text,
  BoxProps,
  Heading,
  SimpleGrid,
  Button,
  useDisclosure,
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
  Textarea,
  Flex
} from '@chakra-ui/react'
import { ListProjectDto } from '@/dtos/list-project.dto';
import { CardComponent } from './card.component';
import { useEffect, useState } from 'react';
import { useListTasks } from '@/hooks/useListTasks';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createProjectValidator } from '@/validators/create-project.validator';
import { handleCreateProject } from '@/api/create-project';
import { AppError } from '@/lib/app-error';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
  
  interface SidebarProps extends BoxProps {
    listProjects: ListProjectDto;
  }

  export type CreateProjectProps = {
    name: string;
    description: string;
  }


  export function SidebarComponent ({ listProjects, ...rest }: SidebarProps) {
    
    const { id } = useParams();

    const [page, setPage] = useState(1);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const [ isLoading, setIsLoading ] = useState(false);
    const toast = useToast();
    const { signOut } = useAuth();

    useEffect(() => {
       
      }, [id]); 

    const { handlePage, listTasks, totalPages } = useListTasks(+id);

    const { control, handleSubmit, formState: { errors } } = useForm<CreateProjectProps>({
        resolver: yupResolver(createProjectValidator)
    });

    const onSubmit = async (data: CreateProjectProps) => {
        setIsLoading(true);
        try {
          await handleCreateProject(data);
          toast({
            title: 'Projeto Criado com sucesso',
            duration: 9000,
            isClosable: true,
            colorScheme: 'blue',
            position: 'top'
        }) 
        } catch (error) {
          const isAppError = error instanceof AppError;
          const title = isAppError ? error.message : "Não foi possível criar o projeto, Tente novamente mais tarde";
          setIsLoading(false);
          toast({
              title,
              duration: 9000,
              isClosable: true,
              colorScheme: 'red',
              position: 'top'
          }) 
          onClose();
        } finally {
          setIsLoading(false);
          onClose();
        }
      };
  

    return (
    <Box>
        
      <Box
        bg={useColorModeValue('white', 'gray.900')}
        borderRight="1px"
        borderRightColor={useColorModeValue('gray.200', 'gray.700')}
        w={{ base: 'full', md: 60 }}
        pos="fixed"
        h="full"
        {...rest}>
        <Box>
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            Khipo
          </Text>
        </Flex>
          <Box h={"438"} overflowY="scroll" overflowX="hidden" >
            {listProjects.projects && listProjects.totalItems > 0 && listProjects.projects.map((item) => (
                <Button  
                p="4"
                mx="4"
                w={48}
                borderRadius="lg"
                role="group"
                cursor="pointer"
                backgroundColor='var(--gray-100)'
                my={2}
                _hover={{
                  bg: 'cyan.400',
                  color: 'white',
                }}
                key={item.id}>
                    <Link href={`/projects/${item.id}?id=${item.id}`}>{item.name}</Link>
                </Button>
            ))}
          </Box>
        </Box>
        <Box 
        my={8}
        mx={4}
        position='absolute'
        bottom={4}
        >
           <Button onClick={onOpen} width={48}>+ Novo Projeto</Button>
           <Button bgColor={"red.200"} mt={1} onClick={async () => { 
            await signOut()
           }} width={48}><Link href={"/"}>Logout</Link></Button>
        <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
         >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Criar novo Projeto</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
          <FormControl id="name" isRequired>
          <FormLabel>Nome do projeto</FormLabel>
            <Controller
                name="name"
                control={control}
                render={({ field }) => (
                <Input type="name" {...field} />
                )}
            />
                {errors.name && <Text color="red.500">{errors.name.message}</Text>}
            </FormControl>

            <FormControl id="description" isRequired>
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
      </Box>
      </Box>
      <Box ml={{ base: 'auto', md: 60, xl: 80 }}  p="4">
        <SimpleGrid mt={16} spacing={16} columns={{ base: 1, md: 3 }} maxW="1280">
            <Box>
            <Heading fontSize={16} mb={16} color='var(--gray-400)'>Pendente</Heading>
            {listTasks.totalItems > 0 && listTasks.tasks.map((task) => {
                if (task.status == 'PENDENTE') {
                return (
                <CardComponent 
                description={task.description}
                title={task.title}
                key={task.id}
                tags={[...task.tags]}
                />
                )
                } else { return <></>}
            })}
            </Box>

            <Box>
            <Heading fontSize={16} mb={16} color='var(--gray-400)'>Em Progresso</Heading>
            {listTasks.totalItems > 0 && listTasks.tasks.map((task) => {
                if (task.status == 'EM_ANDAMENTO') {
                return (
                <CardComponent 
                description={task.description}
                title={task.title}
                key={task.id}
                tags={[...task.tags]}
                />
                )
                } else { return <></>}
            })}
            </Box>

            <Box>
            <Heading fontSize={16} mb={16} color='var(--gray-400)'>Feito</Heading>
            {listTasks.totalItems > 0 && listTasks.tasks.map((task) => {
                if (task.status == 'CONCLUIDA') {
                return (
                <CardComponent 
                description={task.description}
                title={task.title}
                key={task.id}
                tags={[...task.tags]}
                />
                )
                } else { return <></>}
            })}
            </Box>
            </SimpleGrid>
        </Box>
    </Box>
    )
  }
