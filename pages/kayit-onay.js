import React from 'react';
import AppLayout from "../components/Layout";
import RegisterList from "../components/RegisterList/RegisterList";

const RegisterConfirmPage = props => {
    return (
        <AppLayout activePage={['2']}>
            <RegisterList/>
        </AppLayout>
    );
};


export default RegisterConfirmPage;
