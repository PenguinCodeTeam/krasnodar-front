import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles.less';
import {QueryClient, QueryClientProvider} from 'react-query'
import {Provider} from "react-redux";
import {setupStore} from "./store";

const queryClient = new QueryClient()
const store = setupStore()

ReactDOM.render(
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <App />
        </Provider>,
    </QueryClientProvider>,
  document.getElementById('root')
);


