import React, { useEffect, useRef } from 'react';

interface BackgroundVideoProps {
	videoSrc: string;
}

const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ videoSrc }) => {

	const videoRef = useRef<HTMLVideoElement | null>(null);
	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.play();
		}
	}, []);

	return (
		<div style={{ position: 'relative', height: '100vh', width: '100%' }}>
			<video 
				ref={videoRef} 
				src={videoSrc} 
				style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }} 
				loop 
				muted 
				autoPlay 
			/>
		</div>
	);
};
  
  export default BackgroundVideo;