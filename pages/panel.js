import React from 'react';
import Panel from "../components/Panel/Panel";
import AppLayout from "../components/Layout";

const PanelPage = props => {
    return (
        <AppLayout activePage={['1']}>
            <Panel/>
        </AppLayout>
    );
};

export default PanelPage;
