
import  { useEffect, useState } from 'react';

const QuranPlayer = () => {
    const [surahs, setSurahs] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [audioSrc, setAudioSrc] = useState('');
    const [title, setTitle] = useState('Bismillahir Rahmanir Rahim.');

    useEffect(() => {
        const fetchSurahs = async () => {
            const response = await fetch('https://quran-endpoint.vercel.app/quran');
            const data = await response.json();
            setSurahs(data.data);
        };

        fetchSurahs();
    }, []);

    const play = (idx) => {
        setAudioSrc(surahs[idx]?.recitation.full);
        setTitle(`${idx + 1}. ${surahs[idx]?.asma.en.long}`);
    };

    return (
        <div className="container">
            <div className="player">
                <p style={{ textAlign: 'center', color: 'rgb(6, 243, 6)', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                    Al-HASSAN FARUQ QURAN APP
                </p>
                <div className="title">{title}</div>
                <audio src={audioSrc} className="quranPlayer" controls autoPlay />
                <div className="buttons">
                    <div className="icon previous" onClick={() => setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : currentIndex)}>Prev</div>
                    <div className="icon play" onClick={() => play(currentIndex)}>Play</div>
                    <div className="icon next" onClick={() => setCurrentIndex(currentIndex < surahs.length - 1 ? currentIndex + 1 : currentIndex)}>Next</div>
                </div>
            </div>
            <div className="surahs">
                {surahs.map((surah, idx) => (
                    <div key={idx} onClick={() => play(idx)}>
                        <p className="ar">{surah.asma.ar.long}</p>
                        <p>{surah.asma.en.long} ({surah.asma.translation.en})</p>
                    </div>
                ))}
            </div>
            <footer>
                <p>Hassan Faruq All Rights Reserved 2024</p>
            </footer>
        </div>
    );
};

export default QuranPlayer;
