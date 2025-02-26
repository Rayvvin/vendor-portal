import { Children } from "react";
import * as React from 'react';
import { useState, useEffect } from 'react';


const ChildrenLayout = (props) => {
    const { children } =  props;
    // console.log(children);
    return (
        
        <main>
            <article className="container article">
            {children}
            </article>
        </main>
    )
    

};

export default ChildrenLayout;