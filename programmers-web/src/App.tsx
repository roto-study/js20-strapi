import * as React from "react"
import {
  ChakraProvider,
  Box,
  theme,
  Flex,
  Image,
  Text,
  Tag as TagComponent
} from "@chakra-ui/react"
import { useEffect, useState } from "react"

interface StrapiData<T> {
  data: T[]
}


interface Tag {
  id: number
  name: string
}

interface Course {
  id: number
  nth?: number
  title: string
  price: string
  imageUrl: string
  tags: Tag[]
}

export const App = () => { 
  const [data, setData] = useState<null | StrapiData<Course>>(null)
  const fetchCourses = async () => {
    try {
      const res = await fetch('http://localhost:1337/api/courses?populate=*')
      const data = await res.json() as StrapiData<Course>
        if (!res.ok) {
          throw new Error('Something went wrong')
        }
      setData(data)
    } catch(e: any) {
      alert(e.message)
    }
  }
  useEffect(() => {
    fetchCourses()
  }, [])
  return (
    <ChakraProvider theme={theme}>
      <Box padding="40px">
        <Flex gap="16px">
        {data?.data.map((course) => (
          <Box key={course.id} w="300px" borderRadius="16px" borderWidth="1px" borderColor="gray.300">
            <Image w="100%" src={course.imageUrl} alt={course.title} 
              borderTopLeftRadius="16px" borderTopRightRadius="16px"
            />
            <Box padding="16px">
              <Box minHeight="100px">
                <Text fontWeight="bold">
                  {course.nth ? `[${course.nth}기] ` : ''}{course.title}
                </Text>
                {course.tags?.map((tag) => (
                  <TagComponent key={tag.id} size="sm" colorScheme="blue" marginRight="4px">{tag.name}</TagComponent>
                ))}
              </Box>
              <Box textAlign="right">{course.price === '0' ? '무료' : `${course.price}원`}</Box>
            </Box>
          </Box>  
        ))}
        </Flex>
      </Box>
    </ChakraProvider>
  )
}
