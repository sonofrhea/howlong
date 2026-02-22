import { useEffect, useMemo, useState } from 'react';

import apiClient from '../../../BaseEngine';

import { Box } from '@mui/material';
import { AgentInterface } from '../constants/Types';




const UsersManagement = () => {
    const [myData, setMyData] = useState<AgentInterface[]>([]);
    const [loading, setLoading] = useState(true);


    const GetData = async () => {
        try {
            const response = await apiClient.get(`core/users/`);

            setMyData(response.data);
            //console.log(response.data);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        GetData();
    }, [])


    return(
        <div>
            {loading ? <p>Loading data...</p> :
            <div>
                {myData?.map((item, index) => (
                    <Box key={index} sx={{p:2, m:2, boxShadow:3}}>
                        <div className='text-black'> ID: {item.id}</div>
                        <div className='text-black'> Name: {item.name}</div>
                        <div className='text-black'> Email: {item.email}</div>
                    </Box>
                ))}
            </div>
            }
        </div>
    );

};
export default UsersManagement;
