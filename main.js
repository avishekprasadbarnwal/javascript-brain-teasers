import { data } from './data/data.js';


document.addEventListener('DOMContentLoaded', () => {
    const navMenu = document.getElementById('nav-menu');
    const contentContainer = document.getElementById('content-container');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const sidebar = document.getElementById('sidebar');

    const topics = {
        'introduction': 'Introduction',
        'thisKeyword': '`this` Keyword',
        'hoisting': 'Hoisting',
        'closures': 'Closures & Scope',
        'async': 'Async & Event Loop',
        'equality': 'Equality & Coercion',
        'prototypes': 'Prototypal Inheritance'
    };

    // Populate navigation
    Object.keys(topics).forEach(key => {
        const link = document.createElement('a');
        link.href = '#';
        link.dataset.topic = key;
        link.innerHTML = topics[key];
        link.className = 'nav-link block py-2.5 px-4 rounded transition duration-200 hover:bg-white hover:text-gray-900 border-l-4';
        navMenu.appendChild(link);
    });

    // Handle navigation
    navMenu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            const topicKey = e.target.dataset.topic;
            renderContent(topicKey);

            // Update active link
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            e.target.classList.add('active');

            // Hide sidebar on mobile after click
            sidebar.classList.add('-translate-x-full');
        }
    });

    // Mobile menu toggle
    mobileMenuButton.addEventListener('click', () => {
        sidebar.classList.toggle('-translate-x-full');
    });

    function renderContent(topicKey) {
        const topicData = data[topicKey];
        if (!topicData) return;

        let teasersHtml = '';
        if (topicData.teasers) {
            teasersHtml = topicData.teasers.map((teaser, index) => `
                <div class="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden mb-6">
                    <div class="p-4 sm:p-6">
                        <h4 class="text-lg font-semibold text-gray-800 mb-4">${teaser.question}</h4>
                        <pre class="code-block rounded-md p-4 text-sm whitespace-pre-wrap overflow-x-auto">${teaser.code}</pre>
                        <button class="btn-accent font-semibold py-2 px-4 rounded-lg mt-4 reveal-btn">Reveal Solution</button>
                    </div>
                    <div class="solution bg-green-50 border-t border-green-200 px-4 sm:px-6">
                        <h5 class="font-bold text-green-800">Solution:</h5>
                        <pre class="bg-transparent text-green-900 font-mono text-sm py-2 whitespace-pre-wrap">${teaser.solution}</pre>
                        <h5 class="font-bold text-gray-800 mt-3">Explanation:</h5>
                        <p class="text-gray-700 mt-1">${teaser.explanation}</p>
                    </div>
                </div>
            `).join('');
        }

        contentContainer.innerHTML = `
            <div class="fade-in">
                <h2 class="text-3xl md:text-4xl font-bold mb-2">${topicData.title}</h2>
                ${topicData.intro ? `<p class="text-lg text-gray-600 mb-8">${topicData.intro}</p>` : ''}
                ${topicData.content ? topicData.content : ''}
                ${teasersHtml}
                ${topicData.extraContent ? topicData.extraContent : ''}
            </div>
        `;

        if (topicKey === 'hoisting') {
            renderHoistingChart();
        }

        if (topicKey === 'async') {
            setupEventLoopSimulation();
        }

        // Add event listeners for new reveal buttons
        contentContainer.querySelectorAll('.reveal-btn').forEach(button => {
            button.addEventListener('click', () => {
                const solutionDiv = button.parentElement.nextElementSibling;
                solutionDiv.classList.toggle('show');
                button.textContent = solutionDiv.classList.contains('show') ? 'Hide Solution' : 'Reveal Solution';
            });
        });

        // Re-setup the event listener for the button in 'thisKeyword' section after content is rendered
        if (topicKey === 'thisKeyword') {
            const myButton = document.getElementById('myButton');
            if (myButton) {
                // Ensure event listeners are not duplicated
                const existingRegularListener = (event) => console.log('Regular function:', event.currentTarget.id);
                const existingArrowListener = (event) => console.log('Arrow function:', myButton.id); // 'this' is myButton here due to lexical scope (globalThis.myButton)

                myButton.removeEventListener('click', existingRegularListener);
                myButton.removeEventListener('click', existingArrowListener);


                myButton.addEventListener('click', function () {
                    console.log('Regular function:', this.id);
                });

                // In a module, top-level 'this' is undefined. For the arrow function defined at the top-level
                // of the module (implicitly outside any other function), 'this' refers to 'undefined'.
                // If it's desired to show the button's ID for the arrow function example too,
                // we need to explicitly reference the button element.
                // However, the question's point is to show that 'this' is different in an arrow function.
                // So keeping `this.id` for the arrow function accurately demonstrates it will be `undefined.id` which is undefined.
                myButton.addEventListener('click', () => {
                    console.log('Arrow function:', this.id);
                });
            } else {
                console.warn("Button with ID 'myButton' not found. Cannot set up event listeners for Question 1.4.");
            }
        }
    }

    function renderHoistingChart() {
        const ctx = document.getElementById('hoistingChart').getContext('2d');
        const data = {
            labels: ['Scope', 'Hoisting', 'Reassignment', 'Redeclaration'],
            datasets: [
                {
                    label: 'var',
                    data: [3, 3, 3, 3],
                    backgroundColor: 'rgba(239, 68, 68, 0.6)',
                    borderColor: 'rgba(239, 68, 68, 1)',
                    borderWidth: 1
                },
                {
                    label: 'let',
                    data: [1, 2, 3, 1],
                    backgroundColor: 'rgba(59, 130, 246, 0.6)',
                    borderColor: 'rgba(59, 130, 246, 1)',
                    borderWidth: 1
                },
                {
                    label: 'const',
                    data: [1, 2, 1, 1],
                    backgroundColor: 'rgba(16, 185, 129, 0.6)',
                    borderColor: 'rgba(16, 185, 129, 1)',
                    borderWidth: 1
                }
            ]
        };
        new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        ticks: {
                            callback: function (value, index, values) {
                                switch (value) {
                                    case 1: return 'No';
                                    case 2: return 'TDZ';
                                    case 3: return 'Yes';
                                }
                            }
                        },
                        grid: { display: false }
                    },
                    y: {
                        grid: { display: false }
                    }
                },
                plugins: {
                    title: { display: true, text: 'Feature Comparison' },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                const value = context.raw;
                                const feature = context.label;
                                if (feature === 'Scope') {
                                    label += (context.dataset.label === 'var') ? 'Function' : 'Block';
                                } else if (feature === 'Hoisting') {
                                    label += (context.dataset.label === 'var') ? 'Yes (to undefined)' : 'Yes (in TDZ)';
                                } else {
                                    label += (value === 3) ? 'Yes' : 'No';
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }

    function setupEventLoopSimulation() {
        const btn = document.getElementById('run-simulation-btn');
        if (!btn) return;

        btn.addEventListener('click', () => {
            const callStack = document.getElementById('call-stack');
            const microQueue = document.getElementById('microtask-queue');
            const macroQueue = document.getElementById('macrotask-queue');

            callStack.innerHTML = '';
            microQueue.innerHTML = '';
            macroQueue.innerHTML = '';

            const createItem = (text, color, extraClasses = '') =>
                `<div class="event-loop-item ${extraClasses} bg-${color}-100 border border-${color}-300 text-${color}-800 p-2 rounded-md text-sm text-center shadow-sm">${text}</div>`;

            const sleep = ms => new Promise(res => setTimeout(res, ms));

            async function run() {
                btn.disabled = true;
                btn.classList.add('opacity-50', 'cursor-not-allowed');

                // Step 1: `console.log('Start')`
                callStack.innerHTML += createItem("log('Start')", 'gray', 'animate-fadeIn');
                await sleep(1000);
                callStack.innerHTML = '';

                // Step 2: `setTimeout`
                callStack.innerHTML += createItem("setTimeout", 'gray', 'animate-fadeIn');
                await sleep(800);
                macroQueue.innerHTML += createItem("Timeout CB", 'blue', 'animate-fadeIn');
                await sleep(500);
                callStack.innerHTML = '';

                // Step 3: `Promise.resolve()`
                callStack.innerHTML += createItem("Promise.resolve", 'gray', 'animate-fadeIn');
                await sleep(800);
                microQueue.innerHTML += createItem("Promise CB", 'green', 'animate-fadeIn');
                await sleep(500);
                callStack.innerHTML = '';

                // Step 4: `console.log('End')`
                callStack.innerHTML += createItem("log('End')", 'gray', 'animate-fadeIn');
                await sleep(1000);
                callStack.innerHTML = '';

                // Step 5: Process Microtasks
                const microTaskItem = microQueue.querySelector('div');
                microQueue.innerHTML = '';
                callStack.innerHTML += microTaskItem.outerHTML;
                await sleep(1200);
                callStack.innerHTML = '';

                // Step 6: Process Macrotasks
                const macroTaskItem = macroQueue.querySelector('div');
                macroQueue.innerHTML = '';
                callStack.innerHTML += macroTaskItem.outerHTML;
                await sleep(1200);
                callStack.innerHTML = '';

                btn.disabled = false;
                btn.classList.remove('opacity-50', 'cursor-not-allowed');
            }
            run();
        });
    }

    // Initial render
    renderContent('introduction');
    document.querySelector('.nav-link[data-topic="introduction"]').classList.add('active');
});
