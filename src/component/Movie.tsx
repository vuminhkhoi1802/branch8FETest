import React, { useEffect, useState } from 'react';
import { Box, Button, Center, Flex, IconButton, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react';
import axios from 'axios'
import {
    RiHeartFill,
    RiHeartLine,
    RiInboxLine,
    RiSearchLine,
    RiLoader2Fill,
    RiArrowUpLine
} from "react-icons/ri";
import { apiKey, apiList, apiSearch } from '../constants/api';
import { Movives } from '../interfaces';
import { addToWishList, removeToWishList, statusWish } from '../helper';

const dataWishList = localStorage.getItem("wishList")

function Movie(props: Movives) {
    const [movies, setMovies] = useState<any[]>([])
    const [page, setPage] = useState<number>(1)
    const [loading, setLoading] = useState(false)
    const [query, setQuery] = useState<string>("")
    const { setData } = props;
    const [total, setTotal] = useState<number>(0)

    useEffect(() => {
        if (!dataWishList) localStorage.setItem("wishList", JSON.stringify([]))
        getListMovies()
    }, [page])

    const getListMovies = async () => {
        setLoading(true)
        const values = await axios.get(`${apiList}?api_key=${apiKey}&language=en-US&page=${page}`)
        if (values.data?.results.length) {
            setMovies(values.data.results)
            setTotal(values.data.total_results)
        } else {
            setMovies([])
            setTotal(0)
        }
        setLoading(false)
    }

    const addToWishListData = (movie: any) => {
        const results = addToWishList(movie)
        setData(results)
    };

    const statusWishData = (movie: any) => {
        const status = statusWish(movie)
        return status
    }

    const loadMore = async () => {
        await handleSearch(page + 1)
        setPage(page + 1)
    }

    const removeToWishListData = (movie: any) => {
        const results = removeToWishList(movie)
        setData(results)

    };

    const handleSearch = async (page = 1) => {
        setLoading(true)
        if (query) {
            const results = await axios.get(`${apiSearch}&api_key=${apiKey}&query=${query}&page=${page}`)
            if (results.data?.results.length) {
                setMovies(results.data.results)
                setTotal(results.data.total_results)
            } else {
                setMovies([])
                setTotal(0)
            }
        } else {
            await getListMovies()
        }
        setLoading(false)
    }

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <>
            <InputGroup mb="16px">
                <InputLeftElement
                    pointerEvents="none"
                    color="gray.500"
                    children={<RiSearchLine />}
                />
                <Input type="tel" onChange={(e) => setQuery(e.target.value)} placeholder="Search Movies" bg="white" onKeyPress={event => {
                    if (event.key === 'Enter') {
                        handleSearch()
                    }
                }} />
            </InputGroup>
            {loading ? <RiLoader2Fill /> : ''}

            {movies.length ? movies.map((movie, index) => (
                <Flex
                    w="full"
                    px="24px"
                    py="16px"
                    bgColor="white"
                    borderRadius="md"
                    justify="space-between"
                    align="center"
                    boxShadow="sm"
                    key={index}
                >
                    <Box>
                        <Text fontWeight="semibold" isTruncated>
                            {movie.title}
                        </Text>
                        <Text color="gray.400" fontSize="xs" isTruncated>
                            {movie.release_date}
                        </Text>
                    </Box>
                    {statusWishData(movie) ? <IconButton
                        variant="ghost"
                        colorScheme="pink"
                        icon={<RiHeartFill />}
                        aria-label="edit"
                        _focus={{ outline: "none" }}
                        isRound
                        onClick={() => removeToWishListData(movie)}
                    /> : <IconButton
                        variant="ghost"
                        colorScheme="pink"
                        icon={<RiHeartLine />}
                        aria-label="edit"
                        _focus={{ outline: "none" }}
                        isRound
                        onClick={() => addToWishListData(movie)}
                    />}


                </Flex>
            )) : <Center py="32px" color="pink.600" flexDirection="column">
                <Box fontSize="x-large" mb="8px">
                    <RiInboxLine />
                </Box>
                No matched result.
            </Center>}
            {total ? <Center>
                <Button
                    variant="ghost"
                    size="md"
                    colorScheme="blackAlpha"
                    onClick={loadMore}
                    isLoading={loading} // set true while loading data
                    loadingText="Loading"
                >
                    Load More
                </Button>
            </Center> : ''}
            <IconButton
                pos="absolute"
                right="16px"
                bottom="24px"
                colorScheme="pink"
                icon={<RiArrowUpLine />}
                aria-label="edit"
                _focus={{ outline: "none" }}
                isRound
                onClick={scrollTop}
            />
        </>

    );
}

export default Movie;