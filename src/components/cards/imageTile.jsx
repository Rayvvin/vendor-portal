import {
    // LongTextInput,
    Chip, Stack, Box, Grid, useMediaQuery, InputAdornment,
} from "@mui/material";
import React, { useRef, useEffect, useState } from "react";
import { ArrowOutwardOutlined, BubbleChart, Search, Security } from "@mui/icons-material";

const ImageTile = (props) => {
    const { img_width, img_height, tran_color, cont_color, title, subtitle, notch } = props;
    const _width = img_width ? (img_width) : ('100%');
    const _height = img_height ? (img_height) : ('80px');
    const _tran_color = tran_color ? (tran_color) : ('var(--section-color)');
    const _cont_color = cont_color ? (cont_color) : ('var(--container-color)');
    const _title = title ? (title) : ('Feature');
    const _subtitle = subtitle ? (subtitle) : ('Earn commissions through the influencer program.');
    const _notch = notch ? (notch) : ('false');


    return <Stack
        // className="home__img"
        // padding={3}
        width={`calc(${_width}  - 7px)`}
        height={`calc(${_height} - 0px)`}
        position={'relative'}
        justifyContent={"center"}
        alignItems={'center'}
    // boxShadow={'0 2px 20px hsla(0, 0%, 0%, 0.06)'}
    // borderRadius={'6px 6px 6px 45px'}


    >
        <Stack
            className="card animate img-tile"
            borderRadius={_notch && _notch === 'true' ? ('6px 6px 45px 6px') : ('6px')}
            // width='100%'
            width={`calc(${_width} - 10px)`}
            height={_height}
            // position={'absolute'}
            // left={'1px'}
            // bottom='1px'
            bgcolor={_cont_color}
            boxShadow={'0 2px 20px hsla(0, 0%, 0%, 0.06)'}
            direction={'row'}
            spacing={1}
            alignItems={'center'}
            margin={0}
            px={2}
            py={2}
            sx={{ transition: 'all .2s ease-in-out' }}
        // boxShadow={`${tran_color && tran_color === 'var(--section-color)'  ? ('none') : ('0 2px 20px hsla(0, 0%, 0%, 0.06)')}`}

        >
            {/* <Stack
                className="card"
                borderRadius='100%'
                width={`calc(${_height} - 15px)`}
                height={`calc(${_height} - 15px)`}
                margin={1}
                // left={'5px'}
                // top='7px'
                // position={'absolute'}
                bgcolor={'rgba(0, 240, 77, 0.05)'}
                justifyContent={"center"}
                alignItems={"center"}
                padding={'4px'}





            >
                <BubbleChart sx={{ color: 'rgb(0, 240, 77)', fontSize: "1rem" }} />



            </Stack> */}
            <Stack
            // top='60px'
            // position={'absolute'}
            // px={2}
            // mx={0}
            >
                <p style={{ fontSize: 'var(--normal-font-size)', fontWeight: 'bold', color: 'var(--title-color)' }} className="card_subtitle">{_title}</p>
                <p style={{ fontSize: 'var(--smallest-font-size)', color: 'var(--text-color)' }} className="card_subtitle">{_subtitle}</p>
            </Stack>
        </Stack>
        {
            _notch && _notch === 'true' ? (<Box
                className="card"
                borderRadius={'45px 0px 6px 0px'}
                width={`calc(${_height} / 4)`}
                height={`calc(${_height} / 4)`}
                position={'absolute'}
                right={'0px'}
                bottom='0px'
                boxShadow={'none'}
                padding={0}
                justifyContent={"center"}
                alignItems={"center"}
                bgcolor={_tran_color}
                margin={0}




            >
                <Box
                    className="card"
                    boxShadow={'none'}
                    borderRadius='100%'
                    position={'absolute'}
                    margin={0}
                    right={'0px'}
                    bottom='0px'
                    padding={'0px'}
                    bgcolor={_tran_color}
                    width={`calc(100%)`}
                    height={`calc(100%)`}
                    justifyContent={"center"}
                    alignItems={"center"}





                >
                    <Stack
                        className="card"
                        borderRadius='100%'
                        width={`calc(100% - 5px)`}
                        height={`calc(100% - 5px)`}
                        margin={0}
                        right={'0px'}
                        bottom='0px'
                        position={'absolute'}
                        bgcolor={'red'}
                        justifyContent={"center"}
                        alignItems={"center"}
                        padding={'11px'}





                    >
                        <ArrowOutwardOutlined sx={{ color: 'white', fontSize: "1rem" }} />

                    </Stack>
                </Box>

            </Box>) : (null)
        }



    </Stack >
}

export default ImageTile;