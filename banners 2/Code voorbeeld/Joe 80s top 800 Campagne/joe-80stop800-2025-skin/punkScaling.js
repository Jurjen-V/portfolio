var containerTop = document.querySelector('.top');
var containerCenter = document.querySelector('.center');
var containerBottom = document.querySelector('.bottom');
var stage = document.querySelector('#stage');
let resizeTimeout;
let oldHeight   = 0;
let oldTop = 0;

const minHeight = 500;
let scalingDoneFlag = false;  
const adr = [ 'ad.nl', 'bd.nl', 'ed.nl', 'tubantia.nl', 'bndestem.nl', 'pzc.nl','destentor.nl','gelderlander.n'  ]

function CalculateStageTop() {
    let pexiscrolldepth = (PEXI.data && PEXI.data.skin) ? PEXI.data.skin.scrollDepth : 0;
    let stageHeight = window.innerHeight;
    let calculatedHeight = (stageHeight - pexiscrolldepth) + PEXI.data.skin.offset;

    if (oldHeight === 0) {
        oldHeight = calculatedHeight;
    }

    const topStyles = window.getComputedStyle(containerTop);
    const marginTop = parseFloat(topStyles.marginTop) || 0;
    
    let centerYOffset = 0;

    if (pexiscrolldepth <= PEXI.data.skin.offset) {
        centerYOffset = -marginTop + pexiscrolldepth;
        if (adr.includes(pexi.data.site)) {
            if(pexiscrolldepth >= 35){
                const navCorrection = 35;
                stageHeight = (stageHeight - pexiscrolldepth) + navCorrection;
            }   
        }
        gsap.to(stage, {
            duration: 0.3,
            height: `${stageHeight}px`,
            ease: "Power2.easeInOut",
            onUpdate: () => {
                let finalHeight = stage.getBoundingClientRect().height;
                oldHeight = finalHeight;

                resizeContainer(finalHeight, 0);
            },
            onComplete: () => {
                stage.style.bottom = '0px';
                stage.style.top = 'initial';
                PEXI.message("scalingdone");
            }
        });
    } else {
    
        calculatedHeight = (stageHeight - pexiscrolldepth);
       if (adr.includes(pexi.data.site)) {
            if(pexiscrolldepth >= 35){
                const navCorrection = 35;
                calculatedHeight = (stageHeight - pexiscrolldepth) + navCorrection;
               
            }   
        }
        if (calculatedHeight < minHeight) {
            calculatedHeight = minHeight;
        }

        gsap.to(stage, {
            duration: 0.3,
            height: `${calculatedHeight}px`,
            bottom: '0px',
            ease: "Power2.easeInOut",
            onUpdate: () => {
                oldHeight = calculatedHeight;
                resizeContainer(calculatedHeight, centerYOffset);
            },
            onComplete: () => {
                PEXI.message("scalingdone");
            }
        });
    }

    resizeContainer(calculatedHeight, centerYOffset);
}

function resizeContainer(oldValues, centerYOffset) {
    // verkrijg de margintop van de topcontainer anders 0.
    const topStyles = window.getComputedStyle(containerTop);
    const marginTop = parseFloat(topStyles.marginTop) || 0;

    // verkrijg de width van alle 3 containers.
    const widthTop = containerTop.offsetWidth;
    const widthCenter = containerCenter.offsetWidth;
    const widthBottom = containerBottom.offsetWidth;

    // verkrijg de height van alle 3 containers.
    const heightTop = containerTop.offsetHeight;
    const heightCenter = containerCenter.offsetHeight;
    const heightBottom = containerBottom.offsetHeight;

    // verkrijg de stageheight en stagewidth.
    const stageHeight = oldValues;
    const stageWidth = stage.clientWidth;

    // pak de breedste container.
    const totalWidth = Math.max(widthTop, widthCenter, widthBottom);

    // totale hoogte van alle containers + margin. (normaliter 1500px)
    let totalHeight = heightTop + heightCenter + heightBottom + marginTop;

    // bereken de scale width en scaleheight.
    const scaleWidth = stageWidth / totalWidth;
    const scaleHeight = (stageHeight - marginTop) / totalHeight;

    // finalscale pakt altijd de kleinste scale.
    const finalScale = Math.min(scaleWidth, scaleHeight);

    // scale alle containers met de finalscale.
    const scaledHeightTop = heightTop * finalScale;
    const scaledHeightCenter = heightCenter * finalScale;
    const scaledHeightBottom = heightBottom * finalScale;

    // margintop is of de margintop, of 0.
    const scaledMarginTop = Math.max(0, marginTop);

    // totale geschaalde hoogte.
    const totalScaledHeight = scaledHeightTop + scaledHeightCenter + scaledHeightBottom + scaledMarginTop;

    // berekening om de center container perfect in het midden te krijgen
    let centerY = Math.round((stageHeight - totalScaledHeight) / 2 + scaledHeightTop + scaledMarginTop) - (heightCenter / 2);

    centerY += centerYOffset + (scaledHeightCenter / 2);

    const oldTop = parseFloat(window.getComputedStyle(containerCenter).top) || 0;
    const oldScale = containerTop.style.transform.match(/scale\(([^)]+)\)/) ? parseFloat(containerTop.style.transform.match(/scale\(([^)]+)\)/)[1]) : 1;

    const animateResize = () => {

        gsap.to([containerTop, containerBottom], 
        {
                duration: 0,
                scale: finalScale,
                xPercent: -50,
                left: "50%",
                x: 0,
            }
        );
             

        gsap.fromTo(containerCenter, {
            scale: oldScale,
            opacity: 1,
            top: oldTop,
            xPercent: -50,
            left: "50%",
            x: 0,
            ease: "Power2.easeOut",
            duration: 0
        }, {
            duration: 0,
            scale: finalScale,
            top: centerY,
            opacity: 1,
            xPercent: -50,
            x: 0,
            left: "50%",
            ease: "Power2.easeOut"
        });
    };
    if(!containerTop.style.transform.includes('translate(-50%, 0%)')){
        containerTop.style.transform += "translate(-50%, 0%)"
    }
    if(!containerCenter.style.transform.includes('translate(-50%, 0%)')){
        containerCenter.style.transform += "translate(-50%, 0%)"
    }
    if(!containerBottom.style.transform.includes('translate(-50%, 0%)')){
        containerBottom.style.transform += "translate(-50%, 0%)"
    }

    requestAnimationFrame(animateResize);
}

window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    CalculateStageTop();
    resizeTimeout = setTimeout(() => {
        
    }, 30);
});

PEXI.scrollDepth(response => {
    clearTimeout(resizeTimeout);
    CalculateStageTop();
    resizeTimeout = setTimeout(() => {
        CalculateStageTop();
    }, 30);
});

CalculateStageTop();




