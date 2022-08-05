
import React from 'react';
import { Outlet } from 'react-router';

const DynamicIndex = React.lazy(() => import('./pages/index'));
const DynamicLayour = React.lazy(() => import('./pages/_layour'));
const DynamicProductsIndex = React.lazy(() => import('./pages/products/index'));
const DynamicProductsId = React.lazy(() => import('./pages/products/[id]'));


export const routes = [
  {
    path: '/',
    element: <Outlet />,
    children: [
      { path: '/', element: <DynamicIndex />, index: true},
      { path: '/_layour', element: <DynamicLayour />, },
      { path: '/products', element: <DynamicProductsIndex />, index: true},
      { path: '/products/:id', element: <DynamicProductsId />, },
    ]
  }
]

export const pages = [
  { route: '/' },
  { route: '/_layour' },
  { route: '/products' },
  { route: '/products/:id' },
]
