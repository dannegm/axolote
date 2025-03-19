import { Route, Switch, Redirect } from 'wouter';
import ExternalRedirect from '@/modules/core/components/common/external-redirect';
import { KrystelRouter } from './krystel';

export const DEBUG = import.meta.env.NEXT_PUBLIC_DEBUG === 'true';
export const TARGET = import.meta.env.NEXT_PUBLIC_TARGET || 'https://danielgarcia.me/';

const Root = () => {
    if (DEBUG) {
        return <Redirect to='/krystel' replace />;
    }
    return <ExternalRedirect to={TARGET} replace />;
};

export const Router = () => (
    <Switch>
        <Route path='/' component={Root} />
        <KrystelRouter basePath='/krystel' />

        <Route>404</Route>
    </Switch>
);
