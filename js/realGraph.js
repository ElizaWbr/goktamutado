
await createRealGraph();

async function createRealGraph() {
    let realData = await getGoksRealStatists();

    let dataHoje = new Date();
    // dataHoje.setDate(dataHoje.getDate() - 1);
    let todayDateString = dataHoje.toDateString();
    
    let labels = [];
    let valores = [];
    let descricoes = [];
    let mensagensGok = [];

    let alteracoesHoje = [];
    let alteracoesHojeLabels = [];
    let descricoesHoje = [];
    let mutadoHoje = 0;

    let dailyCount = [];

    let lastMudanca = "";

    let tempoMutado = 0;
    let tempoDesmutado = 0;
    let mutado = 0;
    let desmutado = 0;

    let firstTime = realData[0].data.toDate();
    let firstTimeInit = realData[0].data.toDate().setHours(0, 0, 0, 0);
    let endTime = realData[realData.length - 1].data.toDate();
    let endTimeInit = realData[realData.length - 1].data.toDate().setHours(0, 0, 0, 0);

    lastMudanca = firstTime;

    realData.forEach(data => {
        let isMutado = data.mutado;
        let valorReal = isMutado ? 0 : 1;
        let dataMudancaInit = data.data.toDate().setHours(0, 0, 0, 0);
        let dataMudanca = data.data.toDate();
        let dataMudancaString = dataMudanca.toDateString();
        let dataFormatada = dataMudanca.toLocaleString("pt-BR", {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        if (isMutado) {
            mutado ++;
            tempoDesmutado += dataMudanca - lastMudanca;
            if (typeof dailyCount[dataMudancaString] == "undefined") {
                dailyCount[dataMudancaString] = {
                    x: dataMudancaInit,
                    y: 1
                };
            } else {
                dailyCount[dataMudancaString].y++;
            }
        } else {
            desmutado ++;
            tempoMutado += dataMudanca - lastMudanca;
        }
        lastMudanca = dataMudanca;

        if (data.mensagem != "empty") {
            mensagensGok.push({
                mensagem: data.mensagem,
                date: dataFormatada
            });
        }

        labels.push(dataFormatada);
        valores.push({
            x: dataMudanca,
            y: valorReal
        });
        descricoes.push(data.mensagem);
        if (dataMudancaString == todayDateString) {
            if (isMutado) {
                mutadoHoje ++;
                alteracoesHoje.push({
                    x: dataMudanca,
                    y: mutadoHoje
                });
                alteracoesHojeLabels.push(dataFormatada);
                descricoesHoje.push(data.mensagem);
            }
        }
    });

    document.getElementById('gok-status-count').innerHTML = mutado;

    let dailyCountValues = [];
    let dailyCountLabels = [];

    for (const key in dailyCount) {
        let value = dailyCount[key];
        dailyCountValues.push(value);
        dailyCountLabels.push(value.x);
    }

    createPizzaTimeChart(tempoMutado, mutado, tempoDesmutado, desmutado);

    createDailyChangesChart(dailyCountLabels, dailyCountValues, firstTimeInit, endTimeInit);
    createTodayChangesChart(alteracoesHojeLabels, alteracoesHoje, descricoesHoje);
    createLineChart(labels, valores, descricoes, firstTime, endTime);

    displayGoksMessages(mensagensGok);
    
    disableLoader();
}
window.createRealGraph = createRealGraph;

function createPizzaTimeChart(tempoMutado, mutado, tempoDesmutado, desmutado){
    const ctx = document.getElementById('gok-status-pizza-time-graph').getContext('2d');
    let chartData = [
        { name: 'Mutado', value: tempoMutado, count: mutado},
        { name: 'Desmutado', value: tempoDesmutado, count: desmutado },
    ];
    const chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Mutado', 'Desmutado'],
            datasets: [
                {
                    label: 'Dataset 1',
                    data: chartData,
                    backgroundColor: ['#ff6700', '#ffd382'],
                }
            ]
        },
        options: {
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function() {
                            return null;
                        },
                        afterBody: function(context) {
                            const index = context[0].dataIndex;
                            let data = chartData[index];
                            let value = data.value;
                            let count = data.count;

                            let totalSeconds = Math.floor(value / 1000);
                            let hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
                            let minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
                            let seconds = String(totalSeconds % 60).padStart(2, '0');
                            
                            return `Contagem: ${count} \n ${hours} horas, ${minutes} minutos e ${seconds} segundos.`;
                        }
                    }
                }
            }
        }
    });
}

function createDailyChangesChart(labels, valores, firstTime, endTime) {
    const ctx = document.getElementById('gok-status-daily-changes').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Gok mutado pelos dias',
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
                    title: {
                        display: true,
                        text: 'Date'
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

function createTodayChangesChart(labels, valores, descricoes) {
    const ctx = document.getElementById('gok-status-today-changes').getContext('2d');

    let firstTime = new Date();
    firstTime.setHours(0, 0, 0, 0);

    let endTime = new Date();
    endTime.setHours(23, 59, 59, 999);

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Gok mutado hoje',
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
                        unit: 'hour',
                        tooltipFormat: 'dd/MM/yyyy HH:mm'
                    },
                    ticks: {
                        callback: function(value, index) {
                            const date = new Date(value);
                            const hours = date.getHours().toString().padStart(2, '0');
                            const minutes = date.getMinutes().toString().padStart(2, '0');

                            return `${hours}:${minutes}`;
                        },
                    },
                    min: firstTime,
                    max: endTime
                },
                y: {
                    ticks: {
                        stepSize: 1,
                    }
                }
            },
        }
    });
}

function createLineChart(labels, valores, descricoes, firstTime, endTime) {
    const ctx = document.getElementById('gok-status-real-graph').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Gok mutado e desmutado ao longo do tempo',
                data: valores,
                borderColor: '#ffa500',
                backgroundColor: '#ffd382',
                fill: true,
                stepped: true,
                radius: 7,
                pointBackgroundColor: '#ff6700',
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'hour',
                        tooltipFormat: 'dd/MM/yyyy HH:mm'
                    },
                    ticks: {
                        callback: function(value, index) {
                            const date = new Date(value);
                            const hours = date.getHours().toString().padStart(2, '0');
                            const minutes = date.getMinutes().toString().padStart(2, '0');

                            if (index == 0 || (hours === '00' && minutes === '00')) {
                                return date.toLocaleDateString('pt-BR') + ` ${hours}:${minutes}`;
                            }

                            return `${hours}:${minutes}`;
                        },
                    },
                    min: firstTime,
                    max: endTime
                },
                y: {
                    ticks: {
                        stepSize: 1,
                        callback: function(value) {
                            if (value === 1) return "Desmutado";
                            if (value === 0) return "Mutado";
                            return "";
                        }
                    }
                }
            },
            plugins: {
                title: {
                    display: false,
                },
                tooltip: {
                    callbacks: {
                        label: function() {
                            return null;
                        },
                        afterBody: function(context) {
                            const index = context[0].dataIndex;
                            let mensagem = descricoes[index];
                            if (mensagem == "empty") {
                                mensagem = "Atualização anônima";
                            }
                            return mensagem;
                        }
                    }
                }
            }
        }
    });
}

function displayGoksMessages(mensagensGok) {
    mensagensGok.forEach(data => {
        let content = "<p class='no-margin goks-list-item'><span>" + data.mensagem + "</span>";
        content += "<span class='tooltip'>";
        content += "<span class='tooltiptext'>" + data.date + "</span>"
        content += "<img src='../img/icons/wizard-hat.svg' alt='Wizard hat' class='icon'/>";
        content += "</span>"
        content += "</p>";
        document.getElementById('gok-messages-list').innerHTML += content;
    });
    document.getElementById('gok-messages-list').innerHTML += "<br>";
}
