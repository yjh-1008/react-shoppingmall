import { QueryClientProvider } from  'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import { useRoutes } from 'react-router-dom'
import Gnb from './components/gnb';
import { getClient } from './queryClient';
import {routes} from './routes'
const App = () =>{
    const route = useRoutes(routes);
    const queryClient = getClient();
    return (
    <QueryClientProvider client={queryClient}>
        <Gnb/>
        {route}
        <ReactQueryDevtools/>
    </QueryClientProvider>
    );
} 

export default App;