import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VisitCounter = () => {
    const [visitCount, setVisitCount] = useState(0);

    useEffect(() => {
        const fetchVisitData = async () => {
            try {
                // ดึงจำนวนผู้เข้าชม
                const response = await axios.get('https://fordvisit.vercel.app/visit-count');
                setVisitCount(response.data.count);
            } catch (error) {
                console.error('Error fetching visit count:', error);
            }

            try {
                // เพิ่มจำนวนผู้เข้าชม
                await axios.get('https://fordvisit.vercel.app/visit');
            } catch (error) {
                console.error('Error incrementing visit count:', error);
            }
        };

        fetchVisitData();
    }, []);

    return (
        <div>
            <p>จำนวนผู้เข้าชม: {visitCount}</p>
        </div>
    );
};

export default VisitCounter;
