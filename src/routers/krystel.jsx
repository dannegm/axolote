import { Route, Redirect } from 'wouter';

import Login from '@/modules/krystel/pages/login/page';

import Card from '@/modules/krystel/pages/card/page';
import Cards from '@/modules/krystel/pages/cards/page';
import Posts from '@/modules/krystel/pages/posts/page';
import Test from '@/modules/krystel/pages/test/page';

import SecretsCards from '@/modules/krystel/pages/secrets/cards/page';
import SecretsEditor from '@/modules/krystel/pages/secrets/editor/page';
import SecretsTools from '@/modules/krystel/pages/secrets/tools/page';
import SecretsLogs from '@/modules/krystel/pages/secrets/logs/page';
import SecretsSettings from '@/modules/krystel/pages/secrets/settings/page';

const SecretsRoot = () => {
    return <Redirect to='/krys/secrets/cards' replace />;
};

export const Secrets = ({ basePath }) => (
    <>
        <Route path={`${basePath}`} component={SecretsRoot} />
        <Route path={`${basePath}/cards`} component={SecretsCards} />
        <Route path={`${basePath}/editor`} component={SecretsEditor} />
        <Route path={`${basePath}/tools`} component={SecretsTools} />
        <Route path={`${basePath}/logs`} component={SecretsLogs} />
        <Route path={`${basePath}/settings`} component={SecretsSettings} />
    </>
);

export const KrystelRouter = ({ basePath }) => (
    <>
        <Route path={`${basePath}/login`} component={Login} />

        <Route path={`${basePath}`} component={Card} />
        <Route path={`${basePath}/cards`} component={Cards} />
        <Route path={`${basePath}/posts`} component={Posts} />
        <Route path={`${basePath}/test`} component={Test} />

        <Secrets basePath={`${basePath}/secrets`} />
    </>
);
