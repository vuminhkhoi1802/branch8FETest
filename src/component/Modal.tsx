import React, { useEffect } from 'react';
import {
    Box,
    Modal,
    Stack,
    Button,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Center,
    Flex,
    Text,
    IconButton
} from "@chakra-ui/react";
import { useState } from "react";
import {
    RiHeartFill,
    RiHeartLine,
    RiInboxLine,
} from "react-icons/ri";
import { propsModal } from '../interfaces';
import { addToWishList, removeToWishList, statusWish } from '../helper';
// import Movie from './Movie';
function Popup(props: propsModal) {
    const { isOpen, onClose, data, setData } = props;
    const [wishData, setWishData] = useState<any[]>([])

    useEffect(() =>{
        if(!data.length){
            const results = JSON.parse(localStorage.getItem("wishList") || "[]")
            console.log(results);
            setWishData(results)
        }else{
            setWishData(data)
        }
       
    },[data])

    const addToWishListData = (movie: any) => {
        const results = addToWishList(movie)
        setData(results)
    };

    const statusWishData = (movie: any) => {
        const status = statusWish(movie)
        return status
    }

    const removeToWishListData = (movie: any) => {
        const results = removeToWishList(movie)
        setData(results)

    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bgColor="#f3f3f3">
                <ModalHeader>Wishlist</ModalHeader>
                <ModalCloseButton />
                <ModalBody p="32px">
                    {/* ----- Empty UI ----- */}
                    <Center py="32px" color="pink.600" flexDirection="column">
                        {wishData?.length ? wishData.map((movie, index) => (
                            <Flex
                                w="full"
                                px="24px"
                                py="16px"
                                my="6px"
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
                        )) : <div>
                            <Box fontSize="x-large" mb="8px">
                                <RiInboxLine />
                            </Box>
                            Find your favorite movies!
                        </div>}


                        <Button
                            mt="16px"
                            size="md"
                            variant="outline"
                            colorScheme="blackAlpha"
                            onClick={onClose}
                        >
                            Close
                        </Button>
                    </Center>

                    {/* ----- Movie List ------ */}
                    <Stack>
                        {/* <Movie /> */}
                    </Stack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default Popup;