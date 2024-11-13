import React from 'react'

import { useRoutes } from 'react-router-dom';
import { route } from '../router';

export default function AllRouter() {
    const routes=useRoutes(route);
  return (
    <>{routes}</>
  )
}
