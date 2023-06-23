import { useState } from 'react'

import { useSwipeable } from 'react-swipeable'
import { useMediaQuery } from 'react-responsive'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import axios from 'axios'

import BackgroundVideo from './components/BackgroundVideo'
import './App.css'; 

import sampleVideo1 from './assets/sampleVideo1.mp4'
import sampleVideo2 from './assets/sampleVideo2.mp4'
import sampleVideo3 from './assets/sampleVideo3.mp4'
import mainLogo from './assets/logo.svg'
import logoMark from './assets/logoMark_white.svg'
import iconAccount from './assets/icon_account.svg'
import iconActivity from './assets/icon_activity.svg'
import iconGames from './assets/icon_games.svg'
import iconHome from './assets/icon_home.svg'
import iconTips from './assets/icon_tips.svg'
import upArrow from './assets/uparrow.svg'
import downArrow from './assets/downarrow.svg'

interface QuestionItem {
	videoUrl: string;
	partnerName: string;
	questionText: string;
	answer1: string;
	answer2: string;
}
const questions: QuestionItem[] = [
	{
		videoUrl: sampleVideo1,
		partnerName: "PartnerName1",
		questionText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla elementum a est ut suscipit. Phasellus quis libero neque. Aenean ut dolor odio. Fusce justo nunc, vestibulum a ultrices at, condimentum quis elit. ",
		answer1: "Side A ANSWER 1",
		answer2: "Side B ANSWER 1",
	},
	{
		videoUrl: sampleVideo2,
		partnerName: "PartnerName2",
		questionText: "Proin auctor sed leo nec laoreet. Curabitur dapibus iaculis molestie. In erat justo, efficitur sit amet porta ut, ullamcorper in purus. Pellentesque ut aliquet enim. Suspendisse non elit eu quam mattis semper eget congue tortor.",
		answer1: "Side A ANSWER 2",
		answer2: "Side B ANSWER 2",
	},
	{
		videoUrl: sampleVideo3,
		partnerName: "PartnerName3",
		questionText: "Donec non euismod massa. Duis volutpat nulla massa, at tincidunt dui commodo nec. Nulla arcu massa, auctor nec efficitur nec, eleifend eu neque. Sed rutrum quam eget sem rutrum auctor.",
		answer1: "Side A ANSWER 3",
		answer2: "Side B ANSWER 3",
	},
];

function App() {

	const isMobile = useMediaQuery({ query: '(max-width: 640px)' }) //Could also do this with a window, event listener if we care about changing the behavior when the user resizes their window vs. just loading the app already in the size.
	const [currentQuestion, setQuestion] = useState(0)

	const goNext = () => {
		setQuestion((currentQuestion + 1) % questions.length); //In real situation would probably do a .map with multiple elements, so the prev and next element are visible as the animation is sliding up and down.
	};

	const goPrev = () => {
		setQuestion((currentQuestion - 1 + questions.length) % questions.length);
	};

	const swipeHandlers = useSwipeable({ //Real basic css3 animation. More sophisticated options possible, track/attach to mouse behavior.
		onSwipedUp: goNext,
		onSwipedDown: goPrev,
		preventScrollOnSwipe: true,
		trackMouse: true
	});

	const handlers = isMobile ? swipeHandlers : {};

	const recordAnswer = async (answer: number) => {
		try {
			const response = await axios.get('http://www.google.com'); //CORS - will always fail.
			alert('Request to API for answer '+answer+' was successful.');
		} catch (error: any) { //type properly with better error handling
			alert('Request failed. Response: '+error.message);
		}
	};

	return (
		<div className="w-full flex flex-col sm:flex-row flex-wrap sm:flex-nowrap py-0 flex-grow bg-white">

			<div className="w-fixed w-full flex-shrink flex-grow-0 sm:max-w-fit bg-white absolute sm:relative z-50 bottom-0 left-0">
				<div className="sticky top-0 p-2 sm:p-8 w-full h-full">

					<div className="content-left hidden sm:block">
						<a href="#"><img src={mainLogo} className="w-36" alt="Versus Logo" /></a>
					</div>
					<hr className="hidden sm:block my-8 h-px border-t-0 bg-black opacity-100 dark:bg-white-500" />
					<ul className="flex sm:flex-col overflow-hidden content-left justify-center">
						<li className="py-2 sm:py-3 hover:bg-gray-100 flex-1">
							<a className="truncate flex content-center justify-center sm:justify-start" href="#">
								<img src={iconHome} className="w-6 sm:me-3 sm:mx-0 mx-3 inline" />
								<span className="hidden sm:inline font-display">Home</span>
							</a>
						</li>
						<li className="py-2 sm:py-3 hover:bg-gray-100 flex-1">
							<a className="truncate flex content-center justify-center sm:justify-start" href="#">
								<img src={iconGames} className="w-6 sm:me-3 sm:mx-0 mx-3 inline" />
								<span className="hidden sm:inline font-display">Games</span>
							</a>
						</li>
						<li className="py-2 sm:py-3 hover:bg-gray-100 flex-1">
							<a className="truncate flex content-center justify-center sm:justify-start" href="#">
								<img src={iconActivity} className="w-6 sm:me-3 sm:mx-0 mx-3 inline" />
								<span className="hidden sm:inline font-display">Activity</span>
							</a>
						</li>
						<li className="py-2 sm:py-3 hover:bg-gray-100 flex-1">
							<a className="truncate flex content-center justify-center sm:justify-start" href="#">
								<img src={iconAccount} className="w-6 sm:me-3 sm:mx-0 mx-3 inline" />
								<span className="hidden sm:inline font-display">Account</span>
							</a>
						</li>
						<li className="hidden sm:flex py-2 sm:py-3 hover:bg-gray-100 flex-1">
							<a className="truncate flex content-center justify-center sm:justify-start" href="#">
								<img src={iconTips} className="w-6 sm:me-3 sm:mx-0 mx-3 inline" />
								<span className="hidden sm:inline font-display">Tips</span>
							</a>
						</li>
					</ul>

				</div>
			</div>

			<div className="w-full flex-grow relative" {...handlers}>
				<TransitionGroup>
					<CSSTransition
						key={currentQuestion}
						timeout={500}
						classNames="slide"
					>
						<div>
							<div className="absolute top-5 left-4 z-50">
								<a href="#"><img src={logoMark} className="logo" alt="Versus Logo" /></a>
							</div>
							<div className="hidden sm:flex flex-col absolute top-1/2 right-4 z-50">
								<button onClick={goPrev}><img src={upArrow} className="w-8 my-1" alt="View Previous" /></button>
								<button onClick={goNext}><img src={downArrow} className="w-8 my-1" alt="View Next" /></button>
							</div>
							<BackgroundVideo videoSrc={questions[currentQuestion].videoUrl} />	
						</div>
					</CSSTransition>
				</TransitionGroup>
			</div>

			<div className="w-fixed w-full flex-shrink flex-grow-0 max-w-full sm:max-w-sm absolute sm:relative z-50 bottom-16 sm:bottom-0 left-0">
				<div className="flex flex-col py-0 px-4 sm:py-6 sm:px-6">

					<h4 className="mb-1 text-white sm:text-black font-bold">@{questions[currentQuestion].partnerName}</h4>
					<p className="text-sm text-white sm:text-black">{questions[currentQuestion].questionText}</p>
					<div className="flex py-4">
						<button className="flex-1 w-1/2 mr-1 p-3 border border-gray-300 rounded-3xl bg-white text-pink-500 text-xs font-bold uppercase" onClick={() => recordAnswer(1)}>
							{questions[currentQuestion].answer1}
						</button>
						<button className="flex-1 w-1/2 ml-1 p-5 border border-gray-300 rounded-3xl bg-white text-teal-300 text-xs font-bold uppercase" onClick={() => recordAnswer(2)}>
							{questions[currentQuestion].answer2}
						</button>
					</div>

				</div>
			</div>

		</div>
	)
}

export default App
