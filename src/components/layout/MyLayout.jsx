// in src/MyLayout.js
import { Layout } from 'react-admin';
import * as React from 'react';
import { useState, useEffect } from 'react';

import { MyMenu } from './MyMenu';
import { MyAppBar } from './MyAppBar';
import Dashboard from '../../dashboard';
import ChildrenLayout from './ChildrenLayout';

export const MyLayout = (props) => {
    return <Layout {...props} menu={MyMenu} appBar={MyAppBar} />;
};