const startButton = document.getElementById("start-button");

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");

const archonImage = document.getElementById("archon-image");

const questionNumber = document.getElementById("question-number");
const progressBar = document.getElementById("progress-bar");
const questionText = document.getElementById("question");
const answerButtons = document.querySelectorAll(".answer-button");

const visionDescription = document.getElementById("vision-description");
const restartButton = document.getElementById("restart-button");


// OUR QUESTIONS
const questions = [
    {
        question: "Tienes una tarde completamente libre. ¿Qué haces?",
        answers: [
            { text: "Empiezo algún proyecto que llevaba tiempo queriendo hacer.", element: "Dendro" },
            { text: "Voy a algún lugar que nunca haya visitado.", element: "Anemo" },
            { text: "Aprovecho para practicar algo en lo que quiero mejorar.", element: "Geo" },
            { text: "Busco a alguien con quien pasar el rato.", element: "Hydro" },
            { text: "Hago algo espontáneo que normalmente no haría.", element: "Pyro" }
        ]
    },

    {
        question: "Alguien duda seriamente de que puedas hacer algo. ¿Cómo reaccionas?",
        answers: [
            { text: "Me dan todavía más ganas de conseguirlo.", element: "Pyro" },
            { text: "Intento descubrir qué les hizo pensar eso.", element: "Dendro" },
            { text: "No necesito convencerlos; yo sé por qué lo estoy haciendo.", element: "Electro" },
            { text: "Me concentro en hacerlo bien y dejar que el resultado hable.", element: "Geo" },
            { text: "Me afecta un poco, aunque probablemente no lo demuestre.", element: "Cryo" }
        ]
    },

    {
        question: "¿Qué valoras más en una amistad?",
        answers: [
            { text: "Que podamos ser completamente nosotros mismos.", element: "Anemo" },
            { text: "Que intentemos entendernos incluso cuando pensamos diferente.", element: "Hydro" },
            { text: "Que podamos hablar de cosas que nos hagan pensar.", element: "Dendro" },
            { text: "Saber que esa persona seguirá ahí cuando realmente la necesite.", element: "Geo" },
            { text: "Que respete las cosas que me hacen diferente.", element: "Electro" }
        ]
    },

    {
        question: "Algo sale completamente diferente a como lo planeaste. ¿Qué haces primero?",
        answers: [
            { text: "Intento adaptarme a lo que está pasando.", element: "Hydro" },
            { text: "Busco exactamente dónde estuvo el problema.", element: "Dendro" },
            { text: "Improviso una alternativa y sigo.", element: "Anemo" },
            { text: "Insisto; todavía puede funcionar.", element: "Pyro" },
            { text: "Me aparto un momento antes de decidir qué hacer.", element: "Cryo" }
        ]
    },

    {
        question: "¿Qué tipo de logro te haría sentir más orgulloso/a?",
        answers: [
            { text: "Haber dominado algo después de muchísimo esfuerzo.", element: "Geo" },
            { text: "Haber conseguido algo que todos creían imposible.", element: "Pyro" },
            { text: "Haber encontrado mi propia forma de hacer algo.", element: "Electro" },
            { text: "Haber ayudado a que otra persona también pudiera conseguirlo.", element: "Hydro" },
            { text: "Haber seguido adelante incluso en un momento difícil.", element: "Cryo" }
        ]
    },

    {
        question: "Encuentras una puerta que nunca habías visto en un lugar conocido. ¿Qué haces?",
        answers: [
            { text: "La abro. Necesito saber qué hay detrás.", element: "Anemo" },
            { text: "Intento averiguar primero de dónde salió.", element: "Dendro" },
            { text: "La observo con cuidado antes de acercarme.", element: "Cryo" },
            { text: "Busco a alguien para investigarla conmigo.", element: "Hydro" },
            { text: "Si nadie más parece dispuesto, entro yo.", element: "Electro" }
        ]
    },

    {
        question: "Cuando tienes un objetivo realmente importante...",
        answers: [
            { text: "Me comprometo con él aunque tarde mucho tiempo.", element: "Geo" },
            { text: "Me obsesiona entender cómo conseguirlo.", element: "Dendro" },
            { text: "Encuentro mi propia manera de llegar hasta él.", element: "Electro" },
            { text: "Cuanto más difícil parece, más ganas me dan de intentarlo.", element: "Pyro" },
            { text: "Hay partes de mí que probablemente tenga que dejar atrás para conseguirlo.", element: "Cryo" }
        ]
    },

    {
        question: "Tienes que tomar una decisión importante y nadie puede ayudarte. ¿Qué haces?",
        answers: [
            { text: "Elijo lo que me permita seguir mi propio camino.", element: "Anemo" },
            { text: "Analizo todo lo que sé antes de decidir.", element: "Dendro" },
            { text: "Confío en aquello que considero correcto, aunque otros no lo entiendan.", element: "Electro" },
            { text: "Pienso en qué decisión podré sostener incluso dentro de años.", element: "Geo" },
            { text: "Pienso también en las personas que podrían verse afectadas.", element: "Hydro" }
        ]
    },

    {
        question: "¿Cuál de estas situaciones te molestaría más?",
        answers: [
            { text: "Sentir que estoy atrapado/a sin poder elegir.", element: "Anemo" },
            { text: "Que alguien trate algo importante para mí como si no significara nada.", element: "Cryo" },
            { text: "Que las personas se nieguen siquiera a intentar entenderse.", element: "Hydro" },
            { text: "Que me digan que algo es imposible antes de intentarlo.", element: "Pyro" },
            { text: "Que esperen que cambie quién soy solamente para encajar.", element: "Electro" }
        ]
    },

    {
        question: "Si pudieras dominar instantáneamente una habilidad, elegirías...",
        answers: [
            { text: "Algo que me permita crear o descubrir cosas nuevas.", element: "Dendro" },
            { text: "Algo que requiera años de disciplina para dominar.", element: "Geo" },
            { text: "Algo que me permita expresarme de una forma completamente propia.", element: "Electro" },
            { text: "Algo que pueda utilizar para ayudar a otras personas.", element: "Hydro" },
            { text: "Algo que me permita hacer cosas que ahora me dan miedo.", element: "Pyro" }
        ]
    },

    {
        question: "¿Cómo reaccionas cuando una persona cercana está pasando por algo difícil?",
        answers: [
            { text: "Me quedo a su lado aunque no sepa exactamente qué decir.", element: "Hydro" },
            { text: "Intento encontrar alguna forma concreta de ayudar.", element: "Geo" },
            { text: "Intento recordarle que las cosas todavía pueden cambiar.", element: "Anemo" },
            { text: "Le doy espacio, pero sigo pendiente por si me necesita.", element: "Cryo" },
            { text: "Intento entender realmente qué está sintiendo antes de aconsejar.", element: "Dendro" }
        ]
    },

    {
        question: "¿Cuál de estas frases se acerca más a tu manera de pensar?",
        answers: [
            { text: "Si quiero algo, tengo que atreverme a intentarlo.", element: "Pyro" },
            { text: "No todo tiene que permanecer igual para siempre.", element: "Anemo" },
            { text: "Hay cosas que vale la pena mantener incluso cuando se vuelven difíciles.", element: "Geo" },
            { text: "No necesito ser como los demás para estar seguro/a de quién soy.", element: "Electro" },
            { text: "Algunas cosas importantes son difíciles de explicar a los demás.", element: "Cryo" }
        ]
    },

    {
        question: "Cuando empiezas a interesarte muchísimo por algo...",
        answers: [
            { text: "Quiero saber absolutamente todo sobre ello.", element: "Dendro" },
            { text: "Quiero compartirlo con alguien.", element: "Hydro" },
            { text: "Intento llevarlo más lejos de lo que pensé al principio.", element: "Pyro" },
            { text: "Termino incorporándolo a mi propia manera de hacer las cosas.", element: "Electro" },
            { text: "Puedo pasar muchísimo tiempo perfeccionándolo.", element: "Geo" }
        ]
    },

    {
        question: "Si pudieras hacer un viaje sin preocuparte por dinero ni tiempo, ¿qué preferirías?",
        answers: [
            { text: "Ir sin un itinerario demasiado estricto y descubrir cosas en el camino.", element: "Anemo" },
            { text: "Conocer lugares y personas muy diferentes a mí.", element: "Hydro" },
            { text: "Visitar lugares que tengan historias que quiera conocer.", element: "Dendro" },
            { text: "Llegar a algún sitio difícil de alcanzar.", element: "Pyro" },
            { text: "Ir a un lugar que tenga un significado especial para mí.", element: "Cryo" }
        ]
    },

    {
        question: "Cometes un error importante. ¿Qué haces?",
        answers: [
            { text: "Averiguo por qué ocurrió para no repetirlo.", element: "Dendro" },
            { text: "Lo acepto e intento seguir adelante.", element: "Anemo" },
            { text: "Hago todo lo posible por reparar las consecuencias.", element: "Hydro" },
            { text: "Me cuesta dejar de pensar en ello, aunque no lo diga.", element: "Cryo" },
            { text: "Me responsabilizo y trabajo para corregirlo.", element: "Geo" }
        ]
    },

    {
        question: "¿Qué clase de persona admiras más?",
        answers: [
            { text: "Alguien que lucha por lo que quiere incluso cuando parece imposible.", element: "Pyro" },
            { text: "Alguien que se atreve a vivir de acuerdo con sus propias reglas.", element: "Electro" },
            { text: "Alguien que sabe cuándo es momento de dejar algo atrás.", element: "Anemo" },
            { text: "Alguien capaz de mantenerse firme durante años.", element: "Geo" },
            { text: "Alguien que ha pasado por mucho sin dejar que eso defina todo lo que es.", element: "Cryo" }
        ]
    },

    {
        question: "Te dan un problema sin una respuesta clara. ¿Qué haces?",
        answers: [
            { text: "Investigo hasta entenderlo lo mejor posible.", element: "Dendro" },
            { text: "Pruebo diferentes posibilidades hasta encontrar una que funcione.", element: "Anemo" },
            { text: "Busco una solución que funcione para todas las personas involucradas.", element: "Hydro" },
            { text: "Propongo algo poco convencional aunque parezca extraño al principio.", element: "Electro" },
            { text: "Elijo una opción y me comprometo a llevarla hasta el final.", element: "Geo" }
        ]
    },

    {
        question: "¿Qué te da más miedo perder?",
        answers: [
            { text: "La posibilidad de decidir qué hacer con mi propia vida.", element: "Anemo" },
            { text: "Una parte de mí que considero fundamental.", element: "Cryo" },
            { text: "A las personas que realmente me importan.", element: "Hydro" },
            { text: "La oportunidad de alcanzar algo que deseo profundamente.", element: "Pyro" },
            { text: "La capacidad de comprender y seguir descubriendo cosas.", element: "Dendro" }
        ]
    },

    {
        question: "Estás trabajando con un grupo y todos tienen ideas diferentes. ¿Qué haces?",
        answers: [
            { text: "Intento encontrar una solución que incorpore diferentes opiniones.", element: "Hydro" },
            { text: "Propongo algo completamente diferente si creo que puede funcionar.", element: "Electro" },
            { text: "Intento organizar las ideas y descubrir cuáles son viables.", element: "Dendro" },
            { text: "Ayudo a convertir la decisión final en un plan concreto.", element: "Geo" },
            { text: "Intento mantener la energía del grupo para que no abandonemos.", element: "Pyro" }
        ]
    },

    {
        question: "¿Qué preferirías que dijeran de ti?",
        answers: [
            { text: "Siempre fue fiel a sí mismo/a.", element: "Electro" },
            { text: "Podías contar con él/ella.", element: "Geo" },
            { text: "Nunca dejó de intentarlo.", element: "Pyro" },
            { text: "Incluso cuando parecía distante, le importaban muchísimo las cosas.", element: "Cryo" },
            { text: "Nunca permitió que otros decidieran toda su vida.", element: "Anemo" }
        ]
    },

    {
        question: "Si descubres algo que contradice completamente lo que creías...",
        answers: [
            { text: "Quiero investigar cuál de las dos ideas tiene más sentido.", element: "Dendro" },
            { text: "Cambio de opinión si encuentro una explicación mejor.", element: "Hydro" },
            { text: "Me tomo tiempo para procesarlo antes de decidir qué pienso.", element: "Cryo" },
            { text: "No tengo problema con cambiar mi camino si es necesario.", element: "Anemo" },
            { text: "Intento encontrar una perspectiva que quizá nadie haya considerado.", element: "Electro" }
        ]
    },

    {
        question: "¿Qué te hace continuar cuando algo se vuelve muy difícil?",
        answers: [
            { text: "Recordar por qué empecé.", element: "Geo" },
            { text: "Las ganas de descubrir hasta dónde puedo llegar.", element: "Pyro" },
            { text: "Saber que todavía hay algo que no entiendo.", element: "Dendro" },
            { text: "Pensar que mi esfuerzo puede beneficiar a alguien más.", element: "Hydro" },
            { text: "Saber que la decisión de continuar sigue siendo mía.", element: "Anemo" }
        ]
    },

    {
        question: "Al conocer a alguien nuevo, ¿qué suele interesarte primero?",
        answers: [
            { text: "Cómo piensa y qué cosas le interesan.", element: "Dendro" },
            { text: "Las cosas que lo/la hacen diferente.", element: "Electro" },
            { text: "Cómo trata a otras personas.", element: "Hydro" },
            { text: "Qué cosas le apasionan de verdad.", element: "Pyro" },
            { text: "Lo que parece guardar para sí mismo/a.", element: "Cryo" }
        ]
    },

    {
        question: "¿Qué tipo de historia probablemente te interesaría más?",
        answers: [
            { text: "Alguien que dedica años de su vida a construir algo importante.", element: "Geo" },
            { text: "Alguien que abandona todo lo conocido para encontrar su propio camino.", element: "Anemo" },
            { text: "Alguien que persigue un sueño casi imposible.", element: "Pyro" },
            { text: "Alguien que intenta mantener unida a la gente que quiere.", element: "Hydro" },
            { text: "Alguien que intenta reconciliar dos partes contradictorias de sí mismo/a.", element: "Cryo" }
        ]
    },

    {
        question: "Si todos esperan una cosa de ti, pero tú quieres algo completamente diferente...",
        answers: [
            { text: "Intento encontrar una manera de hacer ambas cosas si es posible.", element: "Hydro" },
            { text: "Investigo mis posibilidades antes de decidir.", element: "Dendro" },
            { text: "Elijo mi propio camino aunque resulte extraño para los demás.", element: "Electro" },
            { text: "Intento liberarme de esas expectativas.", element: "Anemo" },
            { text: "Si realmente lo deseo, lucho por conseguirlo.", element: "Pyro" }
        ]
    },

    {
        question: "¿Cuál de estas cosas te parece más satisfactoria?",
        answers: [
            { text: "Terminar algo que requirió muchísimo tiempo.", element: "Geo" },
            { text: "Finalmente entender algo complicado.", element: "Dendro" },
            { text: "Hacer algo que pensé que no tendría el valor de hacer.", element: "Pyro" },
            { text: "Encontrar una forma de expresar algo que normalmente guardo para mí.", element: "Cryo" },
            { text: "Crear algo que se sienta totalmente mío.", element: "Electro" }
        ]
    },

    {
        question: "Si una regla te parece injusta...",
        answers: [
            { text: "Intento entender por qué existe antes de decidir qué hacer.", element: "Dendro" },
            { text: "Intento cambiarla trabajando con otras personas.", element: "Hydro" },
            { text: "Si impide que haga algo importante para mí, probablemente la desafíe.", element: "Pyro" },
            { text: "No creo que una regla deba decidir quién tengo permitido ser.", element: "Electro" },
            { text: "Si me quita una libertad importante, buscaré una salida.", element: "Anemo" }
        ]
    },

    {
        question: "¿Qué tipo de promesa sería más importante para ti?",
        answers: [
            { text: "Una que hice a alguien que quiero.", element: "Hydro" },
            { text: "Una que hice hace mucho tiempo y todavía considero importante.", element: "Geo" },
            { text: "Una que representa algo que deseo alcanzar.", element: "Pyro" },
            { text: "Una relacionada con algo que no quiero volver a perder.", element: "Cryo" },
            { text: "Una que hice conmigo mismo/a sobre la persona que quiero ser.", element: "Electro" }
        ]
    },

    {
        question: "Si pudieras conocer la respuesta absoluta a una sola pregunta...",
        answers: [
            { text: "Elegiría una pregunta sobre algo que nadie comprende todavía.", element: "Dendro" },
            { text: "Elegiría algo relacionado con las personas que quiero.", element: "Hydro" },
            { text: "Elegiría algo sobre una parte de mi pasado que todavía no comprendo.", element: "Cryo" },
            { text: "Preferiría no saberlo; algunas respuestas quiero descubrirlas por mí mismo/a.", element: "Anemo" },
            { text: "Elegiría algo que pudiera cambiar lo que soy capaz de conseguir.", element: "Pyro" }
        ]
    },

    {
        question: "¿Qué haces cuando algo te importa muchísimo?",
        answers: [
            { text: "Le dedico todo el esfuerzo que sea necesario.", element: "Geo" },
            { text: "No dejo que otros decidan cuánto debería importarme.", element: "Electro" },
            { text: "Intento comprenderlo desde todos los ángulos posibles.", element: "Dendro" },
            { text: "Puede que no lo demuestre mucho, pero no lo olvido fácilmente.", element: "Cryo" },
            { text: "Busco la forma de compartirlo con las personas importantes para mí.", element: "Hydro" }
        ]
    },

    {
        question: "Si tu vida cambiara por completo mañana...",
        answers: [
            { text: "Intentaría descubrir qué posibilidades nuevas tengo ahora.", element: "Anemo" },
            { text: "Buscaría algo estable desde donde empezar de nuevo.", element: "Geo" },
            { text: "Intentaría adaptarme sin perder a las personas importantes para mí.", element: "Hydro" },
            { text: "Aprovecharía para convertirme en una versión de mí que antes no podía ser.", element: "Electro" },
            { text: "Me costaría dejar ciertas cosas atrás, aunque siguiera adelante.", element: "Cryo" }
        ]
    },

    {
        question: "¿Cuál de estas cosas podría hacerte trabajar durante horas sin darte cuenta?",
        answers: [
            { text: "Investigar algo que despertó mi curiosidad.", element: "Dendro" },
            { text: "Practicar algo que quiero dominar.", element: "Geo" },
            { text: "Trabajar en algo que me emociona muchísimo.", element: "Pyro" },
            { text: "Crear algo que represente exactamente lo que quiero expresar.", element: "Electro" },
            { text: "Preparar algo especial para otra persona.", element: "Hydro" }
        ]
    },

    {
        question: "Cuando recuerdas una etapa importante de tu vida, ¿qué piensas primero?",
        answers: [
            { text: "En cuánto cambié desde entonces.", element: "Anemo" },
            { text: "En las personas que estuvieron conmigo.", element: "Hydro" },
            { text: "En las cosas que todavía sigo cargando de esa época.", element: "Cryo" },
            { text: "En lo que aprendí gracias a ella.", element: "Dendro" },
            { text: "En cómo influyó en la persona que decidí ser.", element: "Electro" }
        ]
    },

    {
        question: "¿Qué harías si supieras que tienes pocas probabilidades de conseguir algo que deseas?",
        answers: [
            { text: "Lo intentaría de todos modos.", element: "Pyro" },
            { text: "Buscaría otra ruta para llegar al mismo objetivo.", element: "Anemo" },
            { text: "Me prepararía todo lo posible antes de intentarlo.", element: "Geo" },
            { text: "Si significa mucho para mí, probablemente me cueste aceptar renunciar a ello.", element: "Cryo" },
            { text: "Buscaría una forma poco convencional de aumentar mis posibilidades.", element: "Electro" }
        ]
    },

    {
        question: "¿Cuál de estas frases se siente más cercana a ti?",
        answers: [
            { text: "Quiero entender un poco más de lo que entendía ayer.", element: "Dendro" },
            { text: "Quiero poder elegir hacia dónde voy.", element: "Anemo" },
            { text: "Hay cosas que protegería incluso si hacerlo fuera difícil.", element: "Cryo" },
            { text: "Quiero construir algo que pueda permanecer.", element: "Geo" },
            { text: "Quiero llegar más lejos de lo que creo que puedo.", element: "Pyro" }
        ]
    }
];


let currentQuestion = 0;
let answerHistory = [];


// START THE QUIZ
startButton.addEventListener("click", function () {

    startScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    showQuestion();

});


// SHOW A QUESTION
function showQuestion() {

    const current = questions[currentQuestion];

    questionNumber.textContent =
        "Pregunta " + (currentQuestion + 1) + " de " + questions.length;

    questionText.textContent = current.question;


    answerButtons.forEach(function (button, index) {
        button.textContent = current.answers[index].text;
    });


    const progress =
        ((currentQuestion + 1) / questions.length) * 100;

    progressBar.style.width = progress + "%";

}

// SCORE FOR EACH ELEMENT
const scores = {
    Pyro: 0,
    Hydro: 0,
    Dendro: 0,
    Electro: 0,
    Anemo: 0,
    Geo: 0,
    Cryo: 0
};


// WHEN AN ANSWER IS CLICKED
answerButtons.forEach(function (button, index) {

    button.addEventListener("click", function () {

        const current = questions[currentQuestion];

        const selectedElement = current.answers[index].element;

        scores[selectedElement]++;

        answerHistory.push(selectedElement);

        currentQuestion++;

        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showResult();
        }

    });

});


const descriptions = {
    Pyro: "Tu energía nace de la pasión, la ambición y las ganas de superar tus propios límites. Cuando algo realmente te importa, no te conformas con quedarte mirando.",

    Hydro: "Tu fuerza está en la conexión con los demás. Tiendes a adaptarte, escuchar y comprender diferentes perspectivas, incluso cuando las situaciones cambian.",

    Dendro: "La curiosidad guía muchas de tus decisiones. Te interesa entender cómo funcionan las cosas, aprender constantemente y encontrar nuevas formas de ver el mundo.",

    Electro: "Valoras profundamente tu identidad y tu manera única de hacer las cosas. No necesitas seguir el camino de los demás si sabes que existe uno que encaja mejor contigo.",

    Anemo: "La libertad es una parte importante de quién eres. Sabes adaptarte a los cambios y valoras poder elegir tu propio camino sin sentirte atrapado/a por expectativas ajenas.",

    Geo: "Tu fortaleza está en la constancia. Cuando decides que algo vale la pena, eres capaz de dedicarle tiempo, esfuerzo y compromiso hasta construir algo sólido.",

    Cryo: "Hay mucho más detrás de lo que muestras a simple vista. Tiendes a sentir profundamente y a guardar ciertas cosas para ti, pero aquello que realmente valoras puede influir muchísimo en tus decisiones."
};

function showResult() {

    quizScreen.classList.add("hidden");

    const resultScreen = document.getElementById("result-screen");
    const visionResult = document.getElementById("vision-result");

    resultScreen.classList.remove("hidden");


    // FIRST: calculate the winner
    const highestScore = Math.max(...Object.values(scores));

    const tiedElements = Object.keys(scores).filter(function (element) {
        return scores[element] === highestScore;
    });

    let winningElement;

    if (tiedElements.length === 1) {

        winningElement = tiedElements[0];

    } else {

        for (let i = answerHistory.length - 1; i >= 0; i--) {

            if (tiedElements.includes(answerHistory[i])) {
                winningElement = answerHistory[i];
                break;
            }

        }

    }


    // SECOND: show the result
    visionResult.textContent = winningElement;
    visionDescription.textContent = descriptions[winningElement];


    // THIRD: change the design
    const design = resultDesigns[winningElement];

        console.log("Winning element:", winningElement);
        console.log("Design:", design);
        console.log("Background path:", design.background);
        console.log("Archon path:", design.archon);

    document.body.style.backgroundImage =
        'url("' + design.background + '")';

    archonImage.src = design.archon;
    archonImage.alt = winningElement + " Archon";

}

let winningElement;



const resultDesigns = {
    Anemo: {
        background: "archons and background/mondstat.jpg",
        archon: "archons and background/venti.jpg"
    },

    Geo: {
        background: "archons and background/liyue.jpg",
        archon: "archons and background/zhongli.jpg"
    },

    Electro: {
        background: "archons and background/inazuma.jpg",
        archon: "archons and background/raiden.jpg"
    },

    Dendro: {
        background: "archons and background/sumeru.jpg",
        archon: "archons and background/nahida.jpg"
    },

    Hydro: {
        background: "archons and background/fontaine.jpg",
        archon: "archons and background/furina.jpg"
    },

    Pyro: {
        background: "archons and background/natlan.jpg",
        archon: "archons and background/mavuika.png"
    },

    Cryo: {
        background: "archons and background/snezhnaya.jpeg",
        archon: "archons and background/tsaritsa.jpg"
    }
};