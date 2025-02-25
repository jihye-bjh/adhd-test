document.addEventListener('DOMContentLoaded', function() {
    // 요소 참조
    const introSection = document.getElementById('introSection');
    const testSection = document.getElementById('testSection');
    const resultSection = document.getElementById('resultSection');
    
    const startBtn = document.getElementById('startBtn');
    const nextBtn = document.getElementById('nextBtn');
    const restartBtn = document.getElementById('restartBtn');
    const printBtn = document.getElementById('printBtn');
    
    const questionText = document.getElementById('question-text');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const options = document.querySelectorAll('input[name="answer"]');
    
    // 결과 참조
    const resultSummary = document.getElementById('result-summary');
    const attentionScore = document.getElementById('attention-score');
    const hyperactivityScore = document.getElementById('hyperactivity-score');
    const impactScore = document.getElementById('impact-score');
    const attentionBar = document.getElementById('attention-bar');
    const hyperactivityBar = document.getElementById('hyperactivity-bar');
    const impactBar = document.getElementById('impact-bar');
    const interpretation = document.getElementById('interpretation');
    
    // 질문 목록
    const questions = [
        // 주의력 결핍 항목 (1-9)
        "세부사항에 주의를 기울이지 못하거나 부주의한 실수를 합니까?",
        "지속적인 주의집중이 필요한 일을 할 때 집중을 유지하기 어렵습니까?",
        "직접 대화할 때 상대방의 말을 경청하지 못한다는 지적을 받습니까?",
        "지시사항을 끝까지 따르지 못하고 업무나 의무를 완수하지 못합니까?",
        "업무나 활동을 체계적으로 정리하기 어렵습니까?",
        "지속적인 정신적 노력이 필요한 일을 피하거나 꺼립니까?",
        "업무나 활동에 필요한 물건들을 자주 분실합니까?",
        "외부 자극에 의해 쉽게 주의가 산만해집니까?",
        "일상적인 활동에서 건망증이 있습니까?",
        
        // 과잉행동/충동성 항목 (10-18)
        "손발을 가만히 두지 못하거나 자리에서 안절부절 못합니까?",
        "앉아있어야 하는 상황에서 자리를 자주 떠납니까?",
        "부적절한 상황에서도 과도하게 활동적이거나 무언가를 해야만 합니까?",
        "여가 활동이나 재미있는 일에 조용히 참여하기 어렵습니까?",
        "마치 모터가 달린 것처럼 끊임없이 움직입니까?",
        "지나치게 말을 많이 합니까?",
        "질문이 채 끝나기도 전에 대답을 불쑥 내뱉습니까?",
        "차례를 기다리는 것이 어렵습니까?",
        "다른 사람의 활동이나 대화에 끼어들거나 방해합니까?",
        
        // 일상생활 영향도 평가 (19-23)
        "업무 성과/학업 수행에 어려움을 겪는 정도는 어떻습니까?",
        "대인관계(친구, 가족, 동료)에 어려움을 겪는 정도는 어떻습니까?",
        "재정 관리(예산, 지출, 청구서)에 어려움을 겪는 정도는 어떻습니까?",
        "시간 관리에 어려움을 겪는 정도는 어떻습니까?",
        "자기 관리(건강, 식사, 수면)에 어려움을 겪는 정도는 어떻습니까?"
    ];
    
    // 변수 초기화
    let currentQuestion = 0;
    let answers = [];
    
    // 테스트 시작
    startBtn.addEventListener('click', function() {
        introSection.classList.remove('active');
        testSection.classList.add('active');
        loadQuestion();
    });
    
    // 라디오 버튼 선택 시 다음 버튼 활성화
    options.forEach(option => {
        option.addEventListener('change', function() {
            nextBtn.disabled = false;
        });
    });
    
    // 다음 질문 로드
    nextBtn.addEventListener('click', function() {
        // 현재 선택된 값 저장
        const selectedOption = document.querySelector('input[name="answer"]:checked');
        answers[currentQuestion] = parseInt(selectedOption.value);
        
        // 다음 질문으로 이동 또는 결과 표시
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    });
    
    // 다시 시작
    restartBtn.addEventListener('click', function() {
        currentQuestion = 0;
        answers = [];
        resultSection.classList.remove('active');
        introSection.classList.add('active');
    });
    
    // 결과 인쇄
    printBtn.addEventListener('click', function() {
        window.print();
    });
    
    // 질문 로드 함수
    function loadQuestion() {
        // 라디오 버튼 초기화
        options.forEach(option => {
            option.checked = false;
        });
        nextBtn.disabled = true;
        
        // 질문 텍스트 업데이트
        questionText.textContent = questions[currentQuestion];
        
        // 진행 상황 업데이트
        const progress = ((currentQuestion + 1) / questions.length) * 100;
        progressBar.style.width = progress + '%';
        progressText.textContent = `질문 ${currentQuestion + 1}/${questions.length}`;
    }
    
    // 결과 표시 함수
    function showResults() {
        testSection.classList.remove('active');
        resultSection.classList.add('active');
        
        // 점수 계산
        const attentionTotal = answers.slice(0, 9).reduce((a, b) => a + b, 0);
        const hyperactivityTotal = answers.slice(9, 18).reduce((a, b) => a + b, 0);
        const totalTotal = attentionTotal + hyperactivityTotal;
        const impactTotal = answers.slice(18, 23).reduce((a, b) => a + b, 0);
        
        // 결과 표시
        attentionScore.textContent = `${attentionTotal}/36`;
        hyperactivityScore.textContent = `${hyperactivityTotal}/36`;
        impactScore.textContent = `${impactTotal}/20`;
        
        // 프로그레스 바 업데이트
        attentionBar.style.width = `${(attentionTotal / 36) * 100}%`;
        hyperactivityBar.style.width = `${(hyperactivityTotal / 36) * 100}%`;
        impactBar.style.width = `${(impactTotal / 20) * 100}%`;
        
        // 결과 바 색상 설정
        setBarColor(attentionBar, attentionTotal, 36);
        setBarColor(hyperactivityBar, hyperactivityTotal, 36);
        setBarColor(impactBar, impactTotal, 20);
        
        // 해석
        let interpretationText = '';
        let summaryText = '';
        
        // 주의력 결핍 해석
        const attentionItems = answers.slice(0, 9).filter(score => score >= 2).length;
        const hyperactivityItems = answers.slice(9, 18).filter(score => score >= 2).length;
        
        // 요약 결과
        if (attentionItems >= 4 && hyperactivityItems >= 4) {
            summaryText = '<div class="result-badge high">ADHD 복합형 가능성</div>';
        } else if (attentionItems >= 4) {
            summaryText = '<div class="result-badge medium">ADHD 주의력 결핍 우세형 가능성</div>';
        } else if (hyperactivityItems >= 4) {
            summaryText = '<div class="result-badge medium">ADHD 과잉행동/충동성 우세형 가능성</div>';
        } else {
            summaryText = '<div class="result-badge low">ADHD 가능성 낮음</div>';
        }
        
        resultSummary.innerHTML = summaryText;
        
        // 상세 해석
        if (attentionItems >= 4 || hyperactivityItems >= 4) {
            interpretationText += '<div class="interpretation-item attention">';
            interpretationText += '<h4>ADHD 증상 분석</h4>';
            
            if (attentionItems >= 4) {
                interpretationText += '<p>주의력 결핍 증상이 유의미하게 나타납니다. 이는 집중력 유지, 과제 완수, 조직화 등에 어려움을 겪을 수 있음을 의미합니다.</p>';
            }
            
            if (hyperactivityItems >= 4) {
                interpretationText += '<p>과잉행동/충동성 증상이 유의미하게 나타납니다. 이는 과도한 활동성, 충동 조절, 차례 기다리기 등에 어려움을 겪을 수 있음을 의미합니다.</p>';
            }
            
            interpretationText += '</div>';
        } else {
            interpretationText += '<div class="interpretation-item normal">';
            interpretationText += '<h4>ADHD 증상 분석</h4>';
            interpretationText += '<p>ADHD 증상이 유의미한 수준으로 나타나지 않았습니다. 그러나 특정 상황에서 주의력이나 활동 조절에 어려움을 경험할 수 있습니다.</p>';
            interpretationText += '</div>';
        }
        
        // 일상생활 영향도 해석
        interpretationText += '<div class="interpretation-item impact">';
        interpretationText += '<h4>일상생활 영향도 분석</h4>';
        
        if (impactTotal >= 10) {
            interpretationText += '<p>일상생활에 상당한 영향을 미치고 있어 전문적 지원을 고려해 보세요. 업무, 대인관계, 자기관리 등 여러 영역에서 어려움을 경험하고 있을 수 있습니다.</p>';
        } else if (impactTotal >= 5) {
            interpretationText += '<p>일상생활에 일부 영향이 있으나 심각한 수준은 아닙니다. 특정 영역에서 개선이 필요할 수 있습니다.</p>';
        } else {
            interpretationText += '<p>일상생활에 미치는 영향은 적은 편입니다. 현재의 대처 전략이 효과적으로 작동하고 있을 수 있습니다.</p>';
        }
        
        interpretationText += '</div>';
        
        // 전문가 상담 권고
        interpretationText += '<div class="interpretation-item recommendation">';
        interpretationText += '<h4>전문가 상담 권고</h4>';
        
        if (attentionItems >= 4 || hyperactivityItems >= 4 || impactTotal >= 10) {
            interpretationText += '<p>테스트 결과에 따르면 전문가 상담이 권장됩니다. 정신건강의학과 전문의나 임상심리전문가를 통해 정확한 평가를 받아보세요.</p>';
        } else {
            interpretationText += '<p>현재 결과만으로는 전문가 상담이 필수적이지 않을 수 있으나, 증상으로 인한 불편함이 있다면 전문가와 상담하는 것이 도움이 될 수 있습니다.</p>';
        }
        
        interpretationText += '</div>';
        
        interpretation.innerHTML = interpretationText;
    }
    
    // 결과 바 색상 설정 함수
    function setBarColor(bar, score, max) {
        const percentage = (score / max) * 100;
        
        if (percentage < 30) {
            bar.style.backgroundColor = '#4cc9f0'; // 낮음
        } else if (percentage < 60) {
            bar.style.backgroundColor = '#4361ee'; // 중간
        } else {
            bar.style.backgroundColor = '#3f37c9'; // 높음
        }
    }
});
