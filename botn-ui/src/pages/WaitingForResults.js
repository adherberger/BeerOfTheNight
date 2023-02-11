import React from 'react';
import { FaBeer } from 'react-icons/fa';
import { BigIconWithMessage } from '../components/components';

export default function WaitingForResults() {
    return (
        <div className="main-page">
            <BigIconWithMessage
                title="The results are in!"
                subtitle="Waiting for admin to share results."
                icon={<FaBeer/>}
            />
        </div>
    )
}
