import React from 'react';
import PropTypes from 'prop-types';
import AppLayout from "../components/Layout";
import Banned from "../components/Banned";

const EngelliHesaplarPage = props => {
    return (
        <AppLayout>
            <Banned/>
        </AppLayout>
    );
};

EngelliHesaplarPage.propTypes = {};

export default EngelliHesaplarPage;
