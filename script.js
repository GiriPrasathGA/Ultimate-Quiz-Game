// Quiz Game Application
class QuizGame {
    constructor() {
        // Game state
        this.currentScreen = 'start';
        this.selectedTopic = null;
        this.selectedDifficulty = null;
        this.questionCount = null;
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.timeLeft = 30;
        this.timer = null;
        this.currentQuestions = [];
        this.isAnswered = false;
        this.audioInitialized = false;

        // Initialize questions database
        this.initializeQuestions();
        
        // Initialize event listeners
        this.initializeEventListeners();
        
        // Initialize audio
        this.initializeAudio();
    }

    // Questions database - organized by topic and difficulty
    initializeQuestions() {
        this.questions = {
            marvel: {
                easy: [
                    {
                        question: "What is the real name of Spider-Man?",
                        answers: ["Peter Parker", "Tony Stark", "Bruce Wayne", "Clark Kent"],
                        correct: 0,
                        explanation: "Peter Parker is the alter ego of Spider-Man in Marvel Comics."
                    },
                    {
                        question: "Which metal is associated with Wolverine's claws?",
                        answers: ["Vibranium", "Adamantium", "Unobtainium", "Steel"],
                        correct: 1,
                        explanation: "Adamantium is the fictional metal bonded to Wolverine's skeleton and claws."
                    },
                    {
                        question: "What is Captain America's shield made of?",
                        answers: ["Steel", "Titanium", "Vibranium", "Iron"],
                        correct: 2,
                        explanation: "Captain America's shield is made of Vibranium, a rare metal from Wakanda."
                    },
                    {
                        question: "Who is the green-skinned superhero who gets stronger when angry?",
                        answers: ["Green Lantern", "The Hulk", "Martian Manhunter", "Beast Boy"],
                        correct: 1,
                        explanation: "The Hulk is Bruce Banner's alter ego who transforms when angry."
                    },
                    {
                        question: "What is Iron Man's real name?",
                        answers: ["Tony Stark", "Bruce Banner", "Steve Rogers", "Thor Odinson"],
                        correct: 0,
                        explanation: "Tony Stark is the billionaire genius who created the Iron Man suit."
                    }
                ],
                normal: [
                    {
                        question: "Which Infinity Stone does Vision have in his forehead?",
                        answers: ["Time Stone", "Mind Stone", "Reality Stone", "Power Stone"],
                        correct: 1,
                        explanation: "The Mind Stone powers Vision and gives him consciousness."
                    },
                    {
                        question: "What is the name of Thor's hammer?",
                        answers: ["Stormbreaker", "Mjolnir", "Gungnir", "Gram"],
                        correct: 1,
                        explanation: "Mjolnir is Thor's enchanted hammer that can only be lifted by those worthy."
                    },
                    {
                        question: "Who founded the X-Men?",
                        answers: ["Magneto", "Professor X", "Cyclops", "Wolverine"],
                        correct: 1,
                        explanation: "Professor Charles Xavier founded the X-Men to protect mutants and humans."
                    },
                    {
                        question: "What is the name of Black Panther's home country?",
                        answers: ["Wakanda", "Genosha", "Atlantis", "Latveria"],
                        correct: 0,
                        explanation: "Wakanda is the technologically advanced African nation ruled by Black Panther."
                    },
                    {
                        question: "Which character is known as the 'Merc with a Mouth'?",
                        answers: ["Spider-Man", "Deadpool", "Wolverine", "Punisher"],
                        correct: 1,
                        explanation: "Deadpool is nicknamed the 'Merc with a Mouth' due to his talkative nature."
                    }
                ],
                hard: [
                    {
                        question: "What is the real name of the Winter Soldier?",
                        answers: ["Sam Wilson", "Bucky Barnes", "John Walker", "Clint Barton"],
                        correct: 1,
                        explanation: "James Buchanan 'Bucky' Barnes was brainwashed to become the Winter Soldier."
                    },
                    {
                        question: "Which cosmic entity serves as Galactus's herald?",
                        answers: ["Silver Surfer", "Nova", "Quasar", "Captain Marvel"],
                        correct: 0,
                        explanation: "Silver Surfer was given cosmic power to serve as Galactus's herald."
                    },
                    {
                        question: "What is the name of Doctor Strange's sanctum in New York?",
                        answers: ["Sanctum Sanctorum", "Mystic Manor", "Kamar-Taj", "The Dark Dimension"],
                        correct: 0,
                        explanation: "The Sanctum Sanctorum is Doctor Strange's base of operations in Greenwich Village."
                    },
                    {
                        question: "Who created the Infinity Gauntlet in the comics?",
                        answers: ["Thanos", "The Living Tribunal", "Eternity", "Thanos with help from the Dwarf King Eitri"],
                        correct: 3,
                        explanation: "In the MCU, the gauntlet was forged by Eitri on Nidavellir for Thanos."
                    },
                    {
                        question: "What is the name of the dimension where Dormammu rules?",
                        answers: ["The Negative Zone", "The Dark Dimension", "The Quantum Realm", "The Mirror Dimension"],
                        correct: 1,
                        explanation: "The Dark Dimension is Dormammu's realm of pure magical energy."
                    }
                ]
            },
            space: {
                easy: [
                    {
                        question: "Which planet is closest to the Sun?",
                        answers: ["Venus", "Mercury", "Earth", "Mars"],
                        correct: 1,
                        explanation: "Mercury is the closest planet to the Sun in our solar system."
                    },
                    {
                        question: "How many moons does Earth have?",
                        answers: ["1", "2", "0", "3"],
                        correct: 0,
                        explanation: "Earth has one natural satellite, the Moon."
                    },
                    {
                        question: "What is the largest planet in our solar system?",
                        answers: ["Saturn", "Jupiter", "Neptune", "Earth"],
                        correct: 1,
                        explanation: "Jupiter is the largest planet in our solar system by both mass and volume."
                    },
                    {
                        question: "What do we call a group of stars that form a pattern?",
                        answers: ["Galaxy", "Constellation", "Nebula", "Solar System"],
                        correct: 1,
                        explanation: "A constellation is a group of stars that appear to form a pattern in the sky."
                    },
                    {
                        question: "Which planet is known as the 'Red Planet'?",
                        answers: ["Venus", "Jupiter", "Mars", "Saturn"],
                        correct: 2,
                        explanation: "Mars is called the Red Planet due to iron oxide (rust) on its surface."
                    }
                ],
                normal: [
                    {
                        question: "What is the name of the galaxy that contains our solar system?",
                        answers: ["Andromeda", "Milky Way", "Whirlpool", "Triangulum"],
                        correct: 1,
                        explanation: "The Milky Way is our home galaxy containing billions of stars including our Sun."
                    },
                    {
                        question: "Which planet has the most extensive ring system?",
                        answers: ["Jupiter", "Saturn", "Uranus", "Neptune"],
                        correct: 1,
                        explanation: "Saturn has the most prominent and extensive ring system in our solar system."
                    },
                    {
                        question: "What is the closest star to Earth (other than the Sun)?",
                        answers: ["Alpha Centauri", "Proxima Centauri", "Sirius", "Betelgeuse"],
                        correct: 1,
                        explanation: "Proxima Centauri is the closest known star to the Sun, about 4.24 light-years away."
                    },
                    {
                        question: "What causes tides on Earth?",
                        answers: ["Solar wind", "Earth's rotation", "Moon's gravity", "Magnetic field"],
                        correct: 2,
                        explanation: "The Moon's gravitational pull is the primary cause of ocean tides on Earth."
                    },
                    {
                        question: "Which space telescope was launched to replace Hubble?",
                        answers: ["Spitzer", "Kepler", "James Webb", "Chandra"],
                        correct: 2,
                        explanation: "The James Webb Space Telescope is Hubble's successor, launched in 2021."
                    }
                ],
                hard: [
                    {
                        question: "What is the theoretical boundary around a black hole called?",
                        answers: ["Event Horizon", "Photon Sphere", "Ergosphere", "Singularity"],
                        correct: 0,
                        explanation: "The Event Horizon is the boundary beyond which nothing can escape a black hole."
                    },
                    {
                        question: "Which type of stellar explosion can briefly outshine an entire galaxy?",
                        answers: ["Nova", "Supernova", "Hypernova", "Kilonova"],
                        correct: 1,
                        explanation: "A supernova can briefly outshine billions of stars in a galaxy."
                    },
                    {
                        question: "What percentage of the universe is made up of dark matter?",
                        answers: ["5%", "15%", "27%", "68%"],
                        correct: 2,
                        explanation: "Dark matter is estimated to comprise about 27% of the universe's mass-energy."
                    },
                    {
                        question: "Which moon of Jupiter is considered most likely to harbor life?",
                        answers: ["Io", "Europa", "Ganymede", "Callisto"],
                        correct: 1,
                        explanation: "Europa has a subsurface ocean that may contain conditions suitable for life."
                    },
                    {
                        question: "What is the name of the theoretical particle that mediates gravity?",
                        answers: ["Photon", "Gluon", "Graviton", "Boson"],
                        correct: 2,
                        explanation: "The graviton is the hypothetical quantum particle that would mediate gravity."
                    }
                ]
            },
            history: {
                easy: [
                    {
                        question: "Who was the first President of the United States?",
                        answers: ["Thomas Jefferson", "George Washington", "John Adams", "Benjamin Franklin"],
                        correct: 1,
                        explanation: "George Washington was the first President of the United States (1789-1797)."
                    },
                    {
                        question: "In which year did World War II end?",
                        answers: ["1944", "1945", "1946", "1947"],
                        correct: 1,
                        explanation: "World War II ended in 1945 with Japan's surrender on September 2, 1945."
                    },
                    {
                        question: "Which ancient wonder of the world was located in Egypt?",
                        answers: ["Hanging Gardens", "Great Pyramid of Giza", "Colossus of Rhodes", "Lighthouse of Alexandria"],
                        correct: 1,
                        explanation: "The Great Pyramid of Giza is the only surviving ancient wonder of the world."
                    },
                    {
                        question: "Who painted the Mona Lisa?",
                        answers: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Donatello"],
                        correct: 1,
                        explanation: "Leonardo da Vinci painted the Mona Lisa during the Italian Renaissance."
                    },
                    {
                        question: "Which empire was ruled by Julius Caesar?",
                        answers: ["Greek Empire", "Roman Empire", "Persian Empire", "Egyptian Empire"],
                        correct: 1,
                        explanation: "Julius Caesar was a Roman general and dictator of the Roman Empire."
                    }
                ],
                normal: [
                    {
                        question: "The Berlin Wall fell in which year?",
                        answers: ["1987", "1988", "1989", "1990"],
                        correct: 2,
                        explanation: "The Berlin Wall fell on November 9, 1989, symbolizing the end of the Cold War."
                    },
                    {
                        question: "Which explorer is credited with discovering the Americas?",
                        answers: ["Vasco da Gama", "Christopher Columbus", "Ferdinand Magellan", "Marco Polo"],
                        correct: 1,
                        explanation: "Christopher Columbus reached the Americas in 1492, though Vikings had arrived earlier."
                    },
                    {
                        question: "The Renaissance began in which country?",
                        answers: ["France", "England", "Italy", "Spain"],
                        correct: 2,
                        explanation: "The Renaissance began in Italy in the 14th century, starting in Florence."
                    },
                    {
                        question: "Which revolution began in 1789?",
                        answers: ["American Revolution", "French Revolution", "Russian Revolution", "Industrial Revolution"],
                        correct: 1,
                        explanation: "The French Revolution began in 1789 with the storming of the Bastille."
                    },
                    {
                        question: "Who wrote 'The Communist Manifesto'?",
                        answers: ["Vladimir Lenin", "Karl Marx and Friedrich Engels", "Joseph Stalin", "Leon Trotsky"],
                        correct: 1,
                        explanation: "Karl Marx and Friedrich Engels co-authored 'The Communist Manifesto' in 1848."
                    }
                ],
                hard: [
                    {
                        question: "The Treaty of Westphalia ended which major conflict?",
                        answers: ["Hundred Years' War", "Thirty Years' War", "Seven Years' War", "War of Spanish Succession"],
                        correct: 1,
                        explanation: "The Treaty of Westphalia (1648) ended the devastating Thirty Years' War in Europe."
                    },
                    {
                        question: "Which Byzantine Emperor reconquered much of the former Western Roman Empire?",
                        answers: ["Constantine I", "Justinian I", "Basil II", "Heraclius"],
                        correct: 1,
                        explanation: "Justinian I reconquered North Africa, Italy, and parts of Spain in the 6th century."
                    },
                    {
                        question: "The Magna Carta was signed in which year?",
                        answers: ["1066", "1215", "1348", "1455"],
                        correct: 1,
                        explanation: "The Magna Carta was signed in 1215, limiting the power of the English king."
                    },
                    {
                        question: "Which ancient civilization created the first known writing system?",
                        answers: ["Egyptians", "Sumerians", "Indus Valley", "Chinese"],
                        correct: 1,
                        explanation: "The Sumerians created cuneiform, the earliest known writing system, around 3200 BCE."
                    },
                    {
                        question: "The Opium Wars were fought between which two countries?",
                        answers: ["Britain and India", "Britain and China", "France and Vietnam", "Spain and Philippines"],
                        correct: 1,
                        explanation: "The Opium Wars (1839-1860) were fought between Britain and Qing Dynasty China."
                    }
                ]
            },
            sports: {
                easy: [
                    {
                        question: "How many players are on a soccer team on the field at one time?",
                        answers: ["10", "11", "12", "9"],
                        correct: 1,
                        explanation: "Each soccer team fields 11 players including the goalkeeper."
                    },
                    {
                        question: "In which sport would you perform a slam dunk?",
                        answers: ["Baseball", "Basketball", "Volleyball", "Tennis"],
                        correct: 1,
                        explanation: "A slam dunk is a scoring technique in basketball."
                    },
                    {
                        question: "How many holes are there in a standard round of golf?",
                        answers: ["16", "18", "20", "24"],
                        correct: 1,
                        explanation: "A standard round of golf consists of 18 holes."
                    },
                    {
                        question: "Which sport is known as 'America's pastime'?",
                        answers: ["Basketball", "Football", "Baseball", "Hockey"],
                        correct: 2,
                        explanation: "Baseball is traditionally known as America's pastime."
                    },
                    {
                        question: "In tennis, what score comes after 30?",
                        answers: ["35", "40", "45", "50"],
                        correct: 1,
                        explanation: "In tennis scoring, the sequence is 0, 15, 30, 40, then game."
                    }
                ],
                normal: [
                    {
                        question: "Which country has won the most FIFA World Cups?",
                        answers: ["Germany", "Argentina", "Brazil", "Italy"],
                        correct: 2,
                        explanation: "Brazil has won the FIFA World Cup 5 times, more than any other nation."
                    },
                    {
                        question: "In which sport would you find a pommel horse?",
                        answers: ["Gymnastics", "Equestrian", "Wrestling", "Track and Field"],
                        correct: 0,
                        explanation: "The pommel horse is an apparatus used in men's artistic gymnastics."
                    },
                    {
                        question: "What is the maximum score possible in ten-pin bowling?",
                        answers: ["250", "270", "300", "350"],
                        correct: 2,
                        explanation: "A perfect game in ten-pin bowling scores 300 points (12 strikes)."
                    },
                    {
                        question: "Which Grand Slam tennis tournament is played on grass courts?",
                        answers: ["US Open", "French Open", "Wimbledon", "Australian Open"],
                        correct: 2,
                        explanation: "Wimbledon is the only Grand Slam tournament played on grass courts."
                    },
                    {
                        question: "In American football, how many points is a touchdown worth?",
                        answers: ["3", "6", "7", "8"],
                        correct: 1,
                        explanation: "A touchdown is worth 6 points, with an extra point attempt worth 1 more."
                    }
                ],
                hard: [
                    {
                        question: "Who holds the record for most career home runs in Major League Baseball?",
                        answers: ["Babe Ruth", "Hank Aaron", "Barry Bonds", "Willie Mays"],
                        correct: 2,
                        explanation: "Barry Bonds holds the MLB record with 762 career home runs."
                    },
                    {
                        question: "In Formula 1, which circuit is known as 'The Temple of Speed'?",
                        answers: ["Monaco", "Silverstone", "Monza", "Spa-Francorchamps"],
                        correct: 2,
                        explanation: "Monza in Italy is known as 'The Temple of Speed' due to its high-speed nature."
                    },
                    {
                        question: "Which swimmer has won the most Olympic gold medals?",
                        answers: ["Mark Spitz", "Michael Phelps", "Ryan Lochte", "Katie Ledecky"],
                        correct: 1,
                        explanation: "Michael Phelps won 23 Olympic gold medals, the most in Olympic history."
                    },
                    {
                        question: "In cricket, what is the term for scoring 100 runs in a single innings?",
                        answers: ["Century", "Double", "Ton", "Both A and C"],
                        correct: 3,
                        explanation: "Both 'century' and 'ton' refer to scoring 100 runs in cricket."
                    },
                    {
                        question: "Which NBA player scored 100 points in a single game?",
                        answers: ["Michael Jordan", "Kobe Bryant", "Wilt Chamberlain", "LeBron James"],
                        correct: 2,
                        explanation: "Wilt Chamberlain scored 100 points for Philadelphia against New York in 1962."
                    }
                ]
            }
        };
    }

    // Initialize audio elements
    initializeAudio() {
        // Initialize Web Audio API for reliable sound generation
        this.initializeWebAudio();
    }

    // Web Audio API for generating sounds when external sources fail
    initializeWebAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API not supported');
            return;
        }
    }

    // Initialize audio context on first user interaction
    initializeAudioContext() {
        if (this.audioInitialized) return;
        
        // Resume audio context (required by browser policies)
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
        
        this.audioInitialized = true;
        console.log('Audio system initialized');
    }

    // Generate click sound using Web Audio API
    generateClickSound() {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(1000, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(100, this.audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.1);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }

    // Generate hover sound using Web Audio API
    generateHoverSound() {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(400, this.audioContext.currentTime);
        oscillator.frequency.linearRampToValueAtTime(600, this.audioContext.currentTime + 0.08);
        
        gainNode.gain.setValueAtTime(0.05, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.08);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.08);
    }

    // Generate success sound using Web Audio API
    generateSuccessSound() {
        if (!this.audioContext) return;
        
        // Create a pleasant chord progression
        const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5 (C major chord)
        
        frequencies.forEach((freq, index) => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);
            
            gainNode.gain.setValueAtTime(0.08, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.4);
            
            oscillator.start(this.audioContext.currentTime + index * 0.1);
            oscillator.stop(this.audioContext.currentTime + 0.4 + index * 0.1);
        });
    }

    // Generate error sound using Web Audio API
    generateErrorSound() {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
        oscillator.frequency.linearRampToValueAtTime(150, this.audioContext.currentTime + 0.2);
        
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.2);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.2);
    }

    // Play sound effect using Web Audio API
    playSound(soundName) {
        if (!this.audioInitialized) {
            this.initializeAudioContext();
        }
        
        this.playGeneratedSound(soundName);
    }

    // Play generated sound as fallback
    playGeneratedSound(soundName) {
        switch(soundName) {
            case 'click':
                this.generateClickSound();
                break;
            case 'hover':
                this.generateHoverSound();
                break;
            case 'correct':
                this.generateSuccessSound();
                break;
            case 'incorrect':
                this.generateErrorSound();
                break;
            case 'celebration':
                this.generateSuccessSound();
                break;
        }
    }

    // Initialize all event listeners
    initializeEventListeners() {
        // Start button
        const startBtn = document.getElementById('startBtn');
        startBtn.addEventListener('click', () => {
            this.initializeAudioContext();
            this.playSound('click');
            this.showScreen('topic');
        });
        startBtn.addEventListener('mouseenter', () => {
            this.initializeAudioContext();
            this.playSound('hover');
        });

        // Topic selection
        document.querySelectorAll('.topic-card').forEach(card => {
            card.addEventListener('click', (e) => {
                this.playSound('click');
                this.selectedTopic = e.currentTarget.getAttribute('data-topic');
                this.updateTheme();
                this.showScreen('difficulty');
            });
            card.addEventListener('mouseenter', () => {
                this.playSound('hover');
            });
        });

        // Difficulty selection
        document.querySelectorAll('.difficulty-card').forEach(card => {
            card.addEventListener('click', (e) => {
                this.playSound('click');
                this.selectedDifficulty = e.currentTarget.getAttribute('data-difficulty');
                this.showScreen('count');
            });
            card.addEventListener('mouseenter', () => {
                this.playSound('hover');
            });
        });

        // Question count selection
        document.querySelectorAll('.count-card').forEach(card => {
            card.addEventListener('click', (e) => {
                this.playSound('click');
                this.questionCount = parseInt(e.currentTarget.getAttribute('data-count'));
                this.startCountdown();
            });
            card.addEventListener('mouseenter', () => {
                this.playSound('hover');
            });
        });

        // Results screen buttons
        const playAgainBtn = document.getElementById('playAgainBtn');
        const changeTopicBtn = document.getElementById('changeTopicBtn');
        
        playAgainBtn.addEventListener('click', () => {
            this.playSound('click');
            this.resetGame();
            this.startCountdown();
        });
        playAgainBtn.addEventListener('mouseenter', () => {
            this.playSound('hover');
        });

        changeTopicBtn.addEventListener('click', () => {
            this.playSound('click');
            this.resetGame();
            this.showScreen('topic');
        });
        changeTopicBtn.addEventListener('mouseenter', () => {
            this.playSound('hover');
        });
    }

    // Update theme based on selected topic
    updateTheme() {
        document.body.className = `theme-${this.selectedTopic}`;
    }

    // Show specific screen
    showScreen(screenName) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        setTimeout(() => {
            document.getElementById(`${screenName}Screen`).classList.add('active');
        }, 100);
        
        this.currentScreen = screenName;
    }

    // Start countdown before quiz
    startCountdown() {
        this.showScreen('countdown');
        let count = 3;
        const countdownElement = document.getElementById('countdownNumber');
        
        const updateCountdown = () => {
            countdownElement.textContent = count;
            countdownElement.style.animation = 'none';
            setTimeout(() => {
                countdownElement.style.animation = 'countdownPulse 1s ease-in-out';
            }, 50);
            
            count--;
            
            if (count >= 0) {
                setTimeout(updateCountdown, 1000);
            } else {
                setTimeout(() => {
                    this.startQuiz();
                }, 1000);
            }
        };
        
        updateCountdown();
    }

    // Start the quiz
    startQuiz() {
        this.prepareQuestions();
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.showScreen('quiz');
        this.displayQuestion();
    }

    // Prepare questions for the quiz
    prepareQuestions() {
        const topicQuestions = this.questions[this.selectedTopic][this.selectedDifficulty];
        
        // Shuffle questions and select the required amount
        const shuffledQuestions = [...topicQuestions].sort(() => Math.random() - 0.5);
        this.currentQuestions = shuffledQuestions.slice(0, this.questionCount);
        
        // Shuffle answers for each question
        this.currentQuestions.forEach(question => {
            const correctAnswer = question.answers[question.correct];
            const shuffledAnswers = [...question.answers].sort(() => Math.random() - 0.5);
            question.shuffledAnswers = shuffledAnswers;
            question.shuffledCorrect = shuffledAnswers.indexOf(correctAnswer);
        });
    }

    // Display current question
    displayQuestion() {
        const question = this.currentQuestions[this.currentQuestionIndex];
        
        // Update question counter and progress
        document.getElementById('questionCounter').textContent = 
            `Question ${this.currentQuestionIndex + 1} of ${this.questionCount}`;
        
        const progressPercent = ((this.currentQuestionIndex + 1) / this.questionCount) * 100;
        document.getElementById('progressFill').style.width = `${progressPercent}%`;
        
        // Update score
        document.getElementById('currentScore').textContent = this.score;
        
        // Display question
        document.getElementById('questionText').textContent = question.question;
        
        // Create answer options
        const answersContainer = document.getElementById('answersContainer');
        answersContainer.innerHTML = '';
        
        question.shuffledAnswers.forEach((answer, index) => {
            const answerElement = document.createElement('div');
            answerElement.className = 'answer-option';
            answerElement.textContent = answer;
            answerElement.addEventListener('click', () => this.selectAnswer(index));
            answerElement.addEventListener('mouseenter', () => {
                if (!this.isAnswered) {
                    this.playSound('hover');
                }
            });
            answersContainer.appendChild(answerElement);
        });
        
        // Start timer
        this.startTimer();
        this.isAnswered = false;
    }

    // Start question timer
    startTimer() {
        this.timeLeft = 30;
        this.updateTimerDisplay();
        
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay();
            
            if (this.timeLeft <= 0) {
                clearInterval(this.timer);
                if (!this.isAnswered) {
                    this.selectAnswer(-1); // Timeout - no answer selected
                }
            }
        }, 1000);
    }

    // Update timer display
    updateTimerDisplay() {
        const timerElement = document.getElementById('timer');
        timerElement.textContent = this.timeLeft;
        
        // Change color when time is running out
        if (this.timeLeft <= 10) {
            timerElement.style.background = 'rgba(255, 107, 107, 0.3)';
            timerElement.style.borderColor = 'rgba(255, 107, 107, 0.7)';
        } else {
            timerElement.style.background = 'rgba(255, 107, 107, 0.2)';
            timerElement.style.borderColor = 'rgba(255, 107, 107, 0.5)';
        }
    }

    // Handle answer selection
    selectAnswer(selectedIndex) {
        if (this.isAnswered) return;
        
        this.isAnswered = true;
        clearInterval(this.timer);
        
        const question = this.currentQuestions[this.currentQuestionIndex];
        const answerOptions = document.querySelectorAll('.answer-option');
        const isCorrect = selectedIndex === question.shuffledCorrect;
        
        // Disable all options
        answerOptions.forEach(option => {
            option.classList.add('disabled');
        });
        
        // Highlight correct and incorrect answers
        if (selectedIndex >= 0) {
            answerOptions[selectedIndex].classList.add(isCorrect ? 'correct' : 'incorrect');
        }
        
        // Always highlight the correct answer
        answerOptions[question.shuffledCorrect].classList.add('correct');
        
        // Update score
        if (isCorrect) {
            this.score++;
            this.playSound('correct');
        } else {
            this.playSound('incorrect');
        }
        
        // Show explanation (optional - can be added later)
        // this.showExplanation(question.explanation);
        
        // Move to next question after delay
        setTimeout(() => {
            this.nextQuestion();
        }, 2000);
    }

    // Move to next question or end quiz
    nextQuestion() {
        this.currentQuestionIndex++;
        
        if (this.currentQuestionIndex < this.questionCount) {
            this.displayQuestion();
        } else {
            this.endQuiz();
        }
    }

    // End quiz and show results
    endQuiz() {
        this.showScreen('results');
        this.displayResults();
        
        // Check for perfect score
        if (this.score === this.questionCount) {
            this.showPerfectScoreAnimation();
        }
    }

    // Display quiz results
    displayResults() {
        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('totalQuestions').textContent = this.questionCount;
        
        const percentage = Math.round((this.score / this.questionCount) * 100);
        document.getElementById('scorePercentage').textContent = `${percentage}%`;
        
        // Set result message based on performance
        const resultMessage = document.getElementById('resultMessage');
        if (percentage === 100) {
            resultMessage.textContent = '🏆 Perfect Score! You are a master of this topic!';
            resultMessage.style.background = 'rgba(46, 213, 115, 0.2)';
        } else if (percentage >= 80) {
            resultMessage.textContent = '🌟 Excellent! You really know your stuff!';
            resultMessage.style.background = 'rgba(52, 152, 219, 0.2)';
        } else if (percentage >= 60) {
            resultMessage.textContent = '👍 Good job! Room for improvement though.';
            resultMessage.style.background = 'rgba(241, 196, 15, 0.2)';
        } else {
            resultMessage.textContent = '📚 Keep studying! You\'ll do better next time.';
            resultMessage.style.background = 'rgba(231, 76, 60, 0.2)';
        }
    }

    // Show perfect score animation
    showPerfectScoreAnimation() {
        this.playSound('celebration');
        const animationContainer = document.getElementById('perfectScoreAnimation');
        
        // Clear any existing animation
        animationContainer.innerHTML = '';
        
        // Create topic-specific animation
        switch (this.selectedTopic) {
            case 'marvel':
                this.createIronManAnimation(animationContainer);
                break;
            case 'space':
                this.createPlanetsAnimation(animationContainer);
                break;
            case 'history':
                this.createLaurelAnimation(animationContainer);
                break;
            case 'sports':
                this.createFireworksAnimation(animationContainer);
                break;
        }
    }

    // Create Iron Man flying animation
    createIronManAnimation(container) {
        const ironMan = document.createElement('div');
        ironMan.innerHTML = '🦾';
        ironMan.style.cssText = `
            position: absolute;
            font-size: 4rem;
            animation: ironManFly 3s ease-in-out;
            z-index: 100;
        `;
        container.appendChild(ironMan);
    }

    // Create planets animation
    createPlanetsAnimation(container) {
        const planets = ['🪐', '🌍', '🌕', '☄️'];
        planets.forEach((planet, index) => {
            const planetElement = document.createElement('div');
            planetElement.innerHTML = planet;
            planetElement.style.cssText = `
                position: absolute;
                font-size: 3rem;
                top: ${20 + index * 15}%;
                left: ${20 + index * 15}%;
                animation: planets 3s linear infinite;
                animation-delay: ${index * 0.5}s;
                z-index: 100;
            `;
            container.appendChild(planetElement);
        });
    }

    // Create laurel wreath animation
    createLaurelAnimation(container) {
        const laurel = document.createElement('div');
        laurel.innerHTML = '🏛️';
        laurel.style.cssText = `
            position: absolute;
            font-size: 6rem;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation: laurel 2s ease-out;
            z-index: 100;
        `;
        container.appendChild(laurel);
    }

    // Create fireworks animation
    createFireworksAnimation(container) {
        const fireworksColors = ['🎆', '🎇', '✨'];
        
        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                const firework = document.createElement('div');
                firework.innerHTML = fireworksColors[Math.floor(Math.random() * fireworksColors.length)];
                firework.style.cssText = `
                    position: absolute;
                    font-size: 3rem;
                    top: ${Math.random() * 80}%;
                    left: ${Math.random() * 80}%;
                    animation: fireworks 2s ease-out;
                    z-index: 100;
                `;
                container.appendChild(firework);
                
                // Remove firework after animation
                setTimeout(() => {
                    if (container.contains(firework)) {
                        container.removeChild(firework);
                    }
                }, 2000);
            }, i * 300);
        }
    }

    // Reset game state
    resetGame() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.isAnswered = false;
        if (this.timer) clearInterval(this.timer);
        
        // Clear perfect score animation
        document.getElementById('perfectScoreAnimation').innerHTML = '';
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new QuizGame();
});

// Add some utility functions for enhanced UX
document.addEventListener('DOMContentLoaded', () => {
    // Add hover sound effects
    document.querySelectorAll('.btn, .topic-card, .difficulty-card, .count-card').forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transform += ' scale(1.02)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = element.style.transform.replace(' scale(1.02)', '');
        });
    });
    
    // Disable context menu on the page for better game experience
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        // Add keyboard shortcuts if needed
        if (e.key === 'Escape') {
            // Could add pause functionality or return to menu
        }
    });
});
