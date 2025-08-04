let currentRole = await getCurrentUserRole();
if (currentRole == "admin" || currentRole == "gok") {
    await checkJackometroButton();
}

await checkJackometroData();

async function checkJackometroButton() {
    let buttonContentContainer = document.getElementById('update-jackometro-container');
    let buttonContent = "<button id='update-jackometro' type='button'>Atualizar contador</button>";
    
    buttonContentContainer.style.display = "";
    buttonContentContainer.innerHTML = buttonContent;

    document.getElementById('update-jackometro').addEventListener('click', async function(event) {
        ableLoader();
        await updateJackometro();
        window.location.replace("jackometro.html");
    });
}

async function checkJackometroData() {
    let realData = await getJacometroStatists();
    let dailyCount = [];

    let firstTimeInit = realData[0].data.toDate().setHours(0, 0, 0, 0);
    let endTimeInit = realData[realData.length - 1].data.toDate().setHours(0, 0, 0, 0);

    document.getElementById('gok-status-count').innerHTML = realData.length;
    realData.forEach(data => {
        let jackDate = data.data.toDate().setHours(0, 0, 0, 0);
        let jackDateString = data.data.toDate().toDateString();

        if (typeof dailyCount[jackDateString] == "undefined") {
            dailyCount[jackDateString] = {
                x: jackDate,
                y: 1
            };
        } else {
            dailyCount[jackDateString].y++;
        }
    });

    let dailyCountValues = [];
    let dailyCountLabels = [];

    for (const key in dailyCount) {
        let value = dailyCount[key];
        dailyCountValues.push(value);
        dailyCountLabels.push(value.x);
    }
    await createJackometroDailyChangesChart(dailyCountLabels, dailyCountValues, firstTimeInit, endTimeInit);
}

function createJackometroDailyChangesChart(labels, valores, firstTime, endTime) {
    const ctx = document.getElementById('jackometro-daily-changes').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Vezes que o Togo chamou o Gok de Jack no dia',
                data: valores,
                borderColor: '#ffa500',
                backgroundColor: '#ffd382',
                radius: 7,
                pointBackgroundColor: '#ff6700',
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day',
                        tooltipFormat: 'dd/MM/yyyy',
                        displayFormats: {
                            day: 'dd/MM/yyyy'
                        }
                    },
                    min: firstTime,
                    max: endTime
                },
                y: {
                    beginAtZero: true,
                    min: 0,
                    ticks: {
                        stepSize: 1,
                    }
                }
            },
            plugins: {
                tooltip: {
                callbacks: {
                        title: (tooltipItems) => {
                        const date = new Date(tooltipItems[0].parsed.x);
                            return date.toLocaleDateString();
                        }
                    }
                }
            }
        }
    });
}

disableLoader();
