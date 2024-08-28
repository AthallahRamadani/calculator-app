import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RandomAyat = () => {
    const [ayat, setAyat] = useState(null);
    const [teksLatin, setTeksLatin] = useState(null);
    const [teksIndonesia, setTeksIndonesia] = useState(null);
    const [nomorAyat, setNomorAyat] = useState(null);
    const [namaLatin, setNamaLatin] = useState(null);
    const [error, setError] = useState(null);

    const getRandomAyat = async () => {
        try {
            const randomSurat = Math.floor(Math.random() * 114) + 1;
            const response = await axios.get(`https://equran.id/api/v2/surat/${randomSurat}`);
            setNamaLatin(response.data.data.namaLatin);

            if (response.data && response.data.data.ayat) {
                const ayatList = response.data.data.ayat;
                const randomAyat = ayatList[Math.floor(Math.random() * ayatList.length)];
                setAyat(randomAyat.teksArab);
                setTeksLatin(randomAyat.teksLatin);
                setTeksIndonesia(randomAyat.teksIndonesia);
                setNomorAyat(randomAyat.nomorAyat);
            }
        } catch (error) {
            setError('Gagal mengambil data ayat.');
        }
    };

    useEffect(() => {
        getRandomAyat();
    }, []);

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Random Ayat</h1>
            {ayat ? (
                <div style={styles.ayatContainer}>
                    <p style={styles.teksArab}>{ayat}</p>
                    <p style={styles.teksLatin}>{teksLatin}</p>
                    <p style={styles.teksIndonesia}>{teksIndonesia}</p>
                    <p style={styles.nomorAyat}>{namaLatin} : {nomorAyat}</p>
                    <button style={styles.button} onClick={getRandomAyat}>Ambil Ayat Lainnya</button>
                </div>
            ) : (
                <p>Memuat...</p>
            )}
            {error && <p style={styles.error}>{error}</p>}
        </div>
    );
};

const styles = {
    container: {
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        backgroundColor: '#f4f4f4',
        borderRadius: '10px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        margin: '0',
        width: '100%',
    },
    title: {
        fontSize: '2em',
        marginBottom: '20px',
        color: '#333',
    },
    ayatContainer: {
        marginBottom: '20px',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
        display: 'inline-block',
        width: '50%',
    },
    teksArab: {
        fontSize: '2em',
        color: '#2b6b2b',
        marginBottom: '10px',
    },
    teksLatin: {
        fontSize: '1.2em',
        color: '#555',
        marginBottom: '10px',
        fontStyle: 'italic',
    },
    teksIndonesia: {
        fontSize: '1.2em',
        color: '#333',
        marginBottom: '20px',
    },
    nomorAyat: {
        fontSize: '1em',
        color: '#999',
        marginBottom: '20px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '1em',
        color: '#fff',
        backgroundColor: '#28a745',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    buttonHover: {
        backgroundColor: '#218838',
    },
    error: {
        color: 'red',
    }
};


export default RandomAyat;
