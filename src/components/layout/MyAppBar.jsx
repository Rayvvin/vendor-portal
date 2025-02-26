import * as React from 'react';
import { useState, useEffect } from 'react';
import { AppBar, Title, ToggleThemeButton } from 'react-admin';
import { Box, Button, Typography, CardActions, Stack, Card, Avatar } from '@mui/material';
const Logo =  '/assets/img/rayvvin_pngs/Logo.png?url';
// const Logo =  '/assets/img/afriomarket_pngs/rayvvin_logo.svg?url';
const Icon = '/assets/img/rayvvin_pngs/favicon.png?url';


export const MyAppBar = (props) => {
    const { title } = props;
    const [tog, setTog ] = React.useState(false);
    const titleRef = React.useRef()
    // console.log(title)

    // useEffect(()=>{
    //     // setTog(false);
    //     if(titleRef.current.children.length > 0){
    //         setTog(true)
    //     }
    //     else{
    //         setTog(false)
    //     }
    // }, [])

    return <AppBar
        sx={{
            "& .RaAppBar-title": {
                flex: 1,
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
            },
        }}
        toolbar={<ToggleThemeButton />}
        {...props}
    >
        <Stack direction='row' width='100%' spacing={2} alignItems='center' justifyContent='center'>
            {
                !tog ? 
                (
                    <>
                    <img src={Logo} alt="Logo" width={120} />
                    </>
                ) : (
                    <>
                    <img src={Icon} alt="Icon" width={35} />
                    </>
                )
                
            }
            {/* <Typography
                        variant="h6"
                        color="inherit"
                        // className={classes.title
                        id="react-admin-title"
                        ref={titleRef}
                        sx={{
                            // flex: 1,
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            fontFamily: 'Lemon',
                            // fontWeight: '600'
                            
                        }}
                    /> */}
        </Stack>
        {/* <span className={classes.spacer} /> */}
    </AppBar>
};