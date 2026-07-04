/* ==========================================================================
   Feng Tai Technology Research Co., Ltd. (Fort RDTech) - Core Multi-Page JS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initActiveNavLink();
  
  // Safe execution of page-specific modules
  if (document.querySelector('.selector-panel')) {
    initUVSelector();
  }
  if (document.querySelector('.science-read-more') || document.querySelector('.portfolio-item')) {
    initScienceModal();
  }
  if (document.getElementById('contact-form')) {
    initContactForm();
  }
  if (document.querySelector('.filter-btn')) {
    initPortfolioFilters();
  }
});

/* ==========================================================================
   Navigation Logic
   ========================================================================== */
function initNavigation() {
  const header = document.querySelector('header');
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Change header appearance on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Toggle mobile menu
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking nav links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }
}

/* ==========================================================================
   Active Navigation Link Highlighter
   ========================================================================== */
function initActiveNavLink() {
  const path = window.location.pathname;
  const page = path.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    
    // Exact match or fallback for root path
    if (href === page || 
        (href === 'index.html' && (page === '' || page === 'index.html')) ||
        (href === '/' && page === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* ==========================================================================
   UV Selector Logic (XMind Flow Integration - 4 Step Stepper)
   ========================================================================== */
const UV_DATA = {
  solutions: {
    'L0-Gen-1': {
      name: 'L0-Gen-1 微乳膏型解膠劑',
      type: '1.0-Gen-1 微乳膏型 (Micro-cream type)',
      chemical: '聚氨酯丙烯酸酯類壓克力 (Urethanes Acrylate)',
      workflow: [
        '將待處理樣件完全浸入 <strong>L0-Gen-1</strong> 瓶子液面下。',
        '在室溫下靜置浸泡約 <strong>0.5 至 2 小時</strong>（例如：CIS機板上的FPC塑膠貼）。',
        '待膠體弱化後，使用精細工具輕巧地將 UV 膠撬出並拉開。',
        '使用 <strong>Gen-0 專用溶劑</strong> 清洗樣件數次以清除殘膠。',
        '置於室溫下吹乾，即可完成清洗與測量。'
      ],
      safety: '不含氯/氟/環烴，性質溫和安全，<strong>完全不傷害光學玻片與敏感基材</strong>。'
    },
    'L0-Gen-2': {
      name: 'L0-Gen-2 微乳膏型解膠劑',
      type: '1.0-Gen-2 微乳膏型 (Micro-cream type)',
      chemical: '甲基丙烯酸酯/甲基壓克力 (Metha-acrylate)',
      workflow: [
        '將樣件放入 <strong>L0-Gen-2</strong> 容器中，使其沒入液面下。',
        '<strong>鎖緊瓶蓋</strong>以防溶劑揮發，並預置於 <strong>40°C - 60°C 的水浴</strong>環境中。',
        '進行水浴加溫約 <strong>2 至 6 小時</strong>。',
        '取出樣件，此時 UV 膠已軟化弱化，使用夾具或撬棒輕巧拉開膠體。',
        '使用 <strong>Gen-0 專用溶劑</strong> 反覆清洗數次，並於室溫下吹乾。'
      ],
      safety: '無毒環保配方，不含氯/氟成分，<strong>不傷害敏感的光學鏡片與玻璃表面</strong>。'
    },
    'L0-Gen-3': {
      name: 'L0-Gen-3 微乳膏型解膠劑',
      type: '1.0-Gen-3 微乳膏型 (Micro-cream type)',
      chemical: '環氧樹脂基無填充膠 (Epoxy-based)',
      workflow: [
        '將樣件浸入 <strong>L0-Gen-3</strong> 瓶子液面下。',
        '<strong>務必鎖緊蓋子</strong>，將容器置於 <strong>50°C - 80°C 的水浴</strong>中。',
        '水浴加溫靜置 <strong>4 至 16 小時</strong>，期間可定期觀察膠體膨潤弱化狀態。',
        '弱化後小心撬出已失去黏性的環氧樹脂膠體。',
        '使用 <strong>Gen-0 專用溶劑</strong> 徹底清洗數次，檢查無殘留後即可重新裝配。'
      ],
      safety: '注意：此高強度溶劑<strong>有可能輕微溶脹或損害 PC (聚碳酸酯) 材質表面</strong>。若周遭包含 PC 材質，請縮短浸泡時間或局部施作。'
    },
    'L0-Gen-4': {
      name: 'L0-Gen-4 微乳膏型解膠劑 (高溫型)',
      type: '1.0-Gen-4 微乳膏型 (Micro-cream type)',
      chemical: '環氧樹脂基-SiO2二氧化矽填充膠 (Epoxy/SiO2 Filled)',
      workflow: [
        '將樣件浸入 <strong>L0-Gen-4</strong> 瓶子液面下，並搭配<strong>安全加熱防護帽</strong>。',
        '<strong>鎖緊蓋子</strong>以確保高溫下的氣密性，置於 <strong>80°C - 100°C 的高溫水浴</strong>中。',
        '高溫水浴靜置 <strong>24 至 96 小時</strong>（適用於高硬度與重防護場景）。',
        '撬出已弱化、變脆或呈粉末狀的二氧化矽填充膠。',
        '使用 <strong>Gen-0 專用溶劑</strong> 清洗數次，並置於 <strong>80°C - 100°C 烘箱</strong>中烘乾後重新組裝。'
      ],
      safety: '高溫操作警示：本劑在高溫下可能<strong>對 PC (聚碳酸酯) 表面造成損傷</strong>。請確保周遭零件皆能耐受 100°C 高溫。'
    },
    'LC0-Gen-5': {
      name: 'LC0-Gen-5 半透明防滴膏 (局部型)',
      type: '1.0-Gen-5 半透明防滴膏 (Drip-resistant Cream)',
      chemical: '環氧樹脂基-SiO2二氧化矽填充膠 (Epoxy/SiO2 Filled - 垂直/局部施作)',
      workflow: [
        '由於樣件周遭含有不耐高溫的元件，或是垂直立面，無法直接浸泡。',
        '將高黏度的 <strong>LC0-Gen-5 半透明防滴膏</strong> 精準塗佈在需要解除的目標膠體上。',
        '做好周圍不耐化學溶劑材質的物理隔絕保護。',
        '<strong>蓋緊保護蓋</strong>，置於 <strong>10°C - 100°C</strong> 的環境下水浴或置於烘箱中烘烤 <strong>24 至 96 小時</strong>。',
        '待局部膠體剝離弱化後撬出，以 <strong>Gen-0 專用溶劑</strong> 清洗，並於適當溫度（依周遭材質耐溫限制）烘乾。'
      ],
      safety: '本防滴膏黏度極大，專為局部解膠設計。<strong>注意：仍有可能傷害周遭 PC 材質表面</strong>，塗佈時請避開 PC 外殼。'
    }
  }
};

function initUVSelector() {
  const navItems = document.querySelectorAll('.selector-nav-item');
  const stepPanels = document.querySelectorAll('.selector-step-content');
  const optionCards = document.querySelectorAll('.option-card');
  const nextBtns = document.querySelectorAll('.next-step-btn');
  const prevBtns = document.querySelectorAll('.prev-step-btn');
  const resultPlaceholder = document.querySelector('.result-placeholder');
  const resultData = document.querySelector('.result-data');
  
  let selectionState = {
    activeStep: 1,
    value: null,
    heatTolerant: null
  };

  function goToStep(stepNum) {
    const num = parseInt(stepNum);
    if (isNaN(num) || num < 1 || num > 4) return;

    selectionState.activeStep = num;
    
    // Update Stepper Navigation UI
    navItems.forEach(item => {
      const itemStep = parseInt(item.getAttribute('data-step'));
      if (itemStep === num) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Update Panels UI
    stepPanels.forEach(panel => {
      panel.classList.remove('active');
    });
    const targetPanel = document.getElementById(`step-panel-${num}`);
    if (targetPanel) {
      targetPanel.classList.add('active');
    }

    // Reset selection in state when changing step
    selectionState.value = null;
    selectionState.heatTolerant = null;
    
    // Clear selection UI for the step we entered
    if (targetPanel) {
      targetPanel.querySelectorAll('.option-card').forEach(card => {
        if (!card.classList.contains('heat-option')) {
          card.classList.remove('selected');
        }
      });
      
      // Hide heat questions
      const activeHeatQ = targetPanel.querySelector('.heat-question');
      if (activeHeatQ) {
        activeHeatQ.style.display = 'none';
        activeHeatQ.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
      }
    }

    // Update Results Panel Visibility
    if (num === 4) {
      resultPlaceholder.innerHTML = `
        <div class="result-placeholder-icon" style="color: var(--plant-green-hover);">
          <i class="fa-solid fa-flask-vial"></i>
        </div>
        <h3 style="font-weight: 700; color: var(--text-main); margin-bottom: 8px;">已進入 Level 4：排除實驗 SOP</h3>
        <p>請參閱上方標準測試包排除實驗流程，依序進行排除檢測，找出最適合您的解膠劑。</p>
      `;
      resultPlaceholder.style.display = 'block';
      resultData.style.display = 'none';
    } else {
      resultPlaceholder.innerHTML = `
        <div class="result-placeholder-icon">
          <i class="fa-solid fa-wand-magic-sparkles"></i>
        </div>
        <h3 style="font-weight: 700; color: var(--text-main); margin-bottom: 8px;">等待分析中</h3>
        <p>請於上方點選對應種類、品牌或硬度，我們將即時為您運算最適合的無損解膠方案與配方步驟。</p>
      `;
      resultPlaceholder.style.display = 'block';
      resultData.style.display = 'none';
    }
  }

  // Expose to window for global access/inline handlers
  window.goToUVStep = goToStep;

  // Stepper Header Clicks
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const step = item.getAttribute('data-step');
      goToStep(step);
    });
  });

  // Next Step Button Clicks
  nextBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const nextStep = btn.getAttribute('data-next');
      console.log('Next step button clicked. Target step:', nextStep);
      goToStep(nextStep);
    });
  });

  // Previous Step Button Clicks
  prevBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const prevStep = btn.getAttribute('data-prev');
      console.log('Prev step button clicked. Target step:', prevStep);
      goToStep(prevStep);
    });
  });

  // Option Card Clicks in Step Panels
  optionCards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (card.classList.contains('heat-option')) {
        return; 
      }

      const activePanel = card.closest('.selector-step-content');
      if (!activePanel) return;

      activePanel.querySelectorAll('.option-card:not(.heat-option)').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');

      const val = card.getAttribute('data-value');
      selectionState.value = val;
      selectionState.heatTolerant = null; 

      const needsHeatCheck = ['epoxy-sio2', 'loctite', 'dexerials', 'water-glue', 'optocast', 'extremely-hard'].includes(val);
      const heatQuestion = activePanel.querySelector('.heat-question');

      if (needsHeatCheck && heatQuestion) {
        heatQuestion.style.display = 'block';
        heatQuestion.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
        
        resultPlaceholder.style.display = 'block';
        resultData.style.display = 'none';
        
        heatQuestion.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        if (heatQuestion) {
          heatQuestion.style.display = 'none';
        }
        calculateResult();
      }
    });
  });

  // Heat Option Clicks
  document.querySelectorAll('.heat-option').forEach(card => {
    card.addEventListener('click', (e) => {
      e.stopPropagation();
      const parentQ = card.closest('.heat-question');
      if (!parentQ) return;
      parentQ.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');

      selectionState.heatTolerant = card.getAttribute('data-heat') === 'yes';
      calculateResult();
    });
  });

  function calculateResult() {
    let targetSolvent = 'L0-Gen-1';
    const val = selectionState.value;
    const step = selectionState.activeStep;

    if (step === 1) {
      if (val === 'urethane') targetSolvent = 'L0-Gen-1';
      else if (val === 'metha') targetSolvent = 'L0-Gen-2';
      else if (val === 'epoxy-pure') targetSolvent = 'L0-Gen-3';
      else if (val === 'epoxy-sio2') targetSolvent = selectionState.heatTolerant ? 'L0-Gen-4' : 'LC0-Gen-5';
    } else if (step === 2) {
      if (val === 'noa65') targetSolvent = 'L0-Gen-1';
      else if (val === 'noa72') targetSolvent = 'L0-Gen-2';
      else if (val === 'epotek') targetSolvent = 'L0-Gen-3';
      else if (['loctite', 'dexerials', 'water-glue', 'optocast'].includes(val)) {
        targetSolvent = selectionState.heatTolerant ? 'L0-Gen-4' : 'LC0-Gen-5';
      }
    } else if (step === 3) {
      if (val === 'soft') targetSolvent = 'L0-Gen-1';
      else if (val === 'semi-hard') targetSolvent = 'L0-Gen-2';
      else if (val === 'hard') targetSolvent = 'L0-Gen-3';
      else if (val === 'extremely-hard') {
        targetSolvent = selectionState.heatTolerant ? 'L0-Gen-4' : 'LC0-Gen-5';
      }
    }

    renderResult(targetSolvent);
  }

  function renderResult(key) {
    const data = UV_DATA.solutions[key];
    if (!data) return;
    
    document.getElementById('res-badge').textContent = data.type;
    document.getElementById('res-title').textContent = data.name;
    
    const listContainer = document.getElementById('res-steps');
    listContainer.innerHTML = '';
    data.workflow.forEach((step, index) => {
      const li = document.createElement('div');
      li.className = 'result-step-item';
      li.innerHTML = `
        <span class="result-step-idx">${index + 1}</span>
        <p>${step}</p>
      `;
      listContainer.appendChild(li);
    });
    
    const warningText = document.getElementById('res-warning-text');
    warningText.innerHTML = data.safety;
    
    resultPlaceholder.style.display = 'none';
    resultData.style.display = 'block';
    
    if (window.innerWidth <= 1024) {
      document.querySelector('.result-panel').scrollIntoView({ behavior: 'smooth' });
    }
  }
}

/* ==========================================================================
   Popular Science & Spec Modals Logic
   ========================================================================== */
const SCIENCE_ARTICLES = {
  'agri-photosynthesis': {
    title: '植物的「光合作用催化劑」：如何讓作物吃飽光能？',
    category: '農業化學與植物生理',
    colorClass: 'color-2',
    svgIcon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3V21M12 3C10.5 5.5 7 6 5 6M12 3C13.5 5.5 17 6 19 6M12 9C10 11.5 6 12 4 12M12 9C14 11.5 18 12 20 12M12 15C9.5 17.5 7 18 5 18M12 15C14.5 17.5 17 18 19 18" stroke="#10b981" stroke-width="2" stroke-linecap="round"/>
              </svg>`,
    content: `
      <p>光合作用是地球上最重要的化學反應，它將太陽能轉化為作物生長的化學能。然而，傳統作物在自然光照下的光能利用率（LUE）通常僅有 1% 到 2%。如何打破這一生理瓶頸？這正是丰泰技研研發<strong>「光合作用促進劑肥料」</strong>的核心目的。</p>
      <h3>1. 葉綠素的紅化與吸收光譜優化</h3>
      <p>植物葉片主要吸收紅光與藍紫光，而對綠光利用率極低。丰泰的光合作用促進劑中含有有機金屬配位複合物，能暫時性調整植物細胞內的微環境，擴大葉綠體對波段光子的捕捉範圍，特別是微弱光與散射光的捕獲效率，使作物在陰雨天或溫室遮陰環境下，依然能維持高效光合反應。</p>
      <h3>2. 活化 Rubisco 碳固定關鍵酶</h3>
      <p>二氧化碳固定是光合作用暗反應的限速步驟，此過程高度依賴一種名為 Rubisco 的催化酶。丰泰促進劑蘊含獨特小分子有機酸誘導因子，能顯著提升 Rubisco 酶的結合活性，加速五碳糖（RuBP）與 CO₂ 的結合效率，減緩光呼吸消耗，將更多的碳源鎖定在植物體內轉化為葡萄糖與澱粉。</p>
      <h3>3. 氣孔開閉的智慧調節</h3>
      <p>在乾旱或高溫環境下，植物為了防止水分散失會關閉氣孔，這也阻斷了 CO₂ 的進入。丰泰促產劑含有鉀離子傳導增強劑，能優化保衛細胞的膨壓調節機制，使氣孔即使在輕度逆境下，也能保持微張狀態進行氣體交換，且不至於過度流失水分，實現「高光效、低水耗」的生理雙贏。</p>
      <h3>實證效果</h3>
      <p>經過多個農業試驗場實測，在連續噴灑丰泰光合作用促進劑 14-21 天後，番茄與草莓的葉綠素相對含量（SPAD值）提升達 22%，單株產量平均增長 18% 至 30%，且果實果糖與維生素C含量有顯著的增長，完美體現了化學材料科技在現代永續農業上的綠色賦能。</p>
    `
  },
  'material-debonding': {
    title: '無損解膠化學：為什麼能在不傷玻璃的情況下溶解 UV 膠？',
    category: '永續材料化學',
    colorClass: 'color-1',
    svgIcon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.5 4.5L4.5 19.5M19.5 4.5C20.5 5.5 20.5 7.5 19.5 8.5L8.5 19.5M19.5 4.5C18.5 3.5 16.5 3.5 15.5 4.5L4.5 15.5M4.5 19.5C3.5 18.5 3.5 16.5 4.5 15.5M4.5 19.5C5.5 20.5 7.5 20.5 8.5 19.5" stroke="#0ea5e9" stroke-width="2"/>
                <circle cx="12" cy="12" r="3" fill="#0ea5e9" opacity="0.3"/>
              </svg>`,
    content: `
      <p>在精密光學鏡頭組裝、CIS影像感測板、手機玻璃面板的製造流程中，高強度的光固化 UV 膠和熱固化環氧樹脂是不可或缺的黏合媒介。然而，當生產發生瑕疵（如貼合偏移、光學塵點）需要重工，或者產品廢棄需要高價值回收時，如何完好拆解這些高度交聯的膠體，成為巨大的技術難題。</p>
      <h3>1. 三維交聯網絡的化學局限</h3>
      <p>UV膠在紫外光照射下，光引發劑啟動丙烯酸酯單體迅速發生三維自由基聚合，形成密不透風的巨大網絡結構。這種結構不溶於常規的酒精、丙酮等溶劑。過去，業界常使用強酸、強鹼、甚至劇毒具致癌性的「氯系溶劑」（如二氯甲烷）來硬性咬蝕。但這不僅極度傷害環境與作業人員健康，更常導致敏感的 PC 塑膠底板溶脹變形，或使高價光學鍍膜玻璃產生表面霧化、剝落。</p>
      <h3>2. 丰泰解膠劑的「溶脹-斷鍵」協同機制</h3>
      <p>丰泰技研開發的<strong>「安全無損解UV膠劑與熱固膠劑」</strong>，其運作原理並非暴力溶解，而是溫和的滲透膨潤與鍵結斷裂：
      <ul>
        <li><strong>分子孔隙擴散</strong>：選用特定極性與分子量極小的非晶態有機溶劑，能快速順著高分子交聯網狀結構的微小縫隙滲透進去。</li>
        <li><strong>體積膨潤（Swelling）</strong>：溶劑分子與高分子鏈產生強烈的溶劑化作用，使原本緊密糾纏的高分子鏈被迫撐開，膠體體積迅速溶脹，剪切強度瞬間下降 95% 以上。</li>
        <li><strong>局部界面剝離</strong>：膨潤導致膠體與基材介面處產生剪切滑移，此時只需用探針大頭針輕撬，膠體便能完整呈片狀或條狀脫落，達成無損剝離。</li>
      </ul>
      </p>
      <h3>3. 環氧樹脂與 SiO2 填充膠的極限挑戰</h3>
      <p>針對難度極高的熱固性環氧樹脂膠（如加入大量高硬度二氧化矽 SiO₂ 球體顆粒以降低熱膨脹的膠體），常規溶劑毫無作用。丰泰的 L0-Gen-4 和 LC0-Gen-5 劑型，採用中高溫（80°C - 100°C）活化技術，在熱動能的輔助下，引導溶劑分子切入高度緻密的環氧網格，甚至配合防滴膏進行局部點膠施作，保護不耐熱周邊元件，實現在 100°C 以下完好救回高價值電子零件的奇蹟。</p>
      <h3>4. 綠色化學的承諾：無氯、無氟、低揮發</h3>
      <p>丰泰全系列解膠劑秉持<strong>綠色化學 (Green Chemistry)</strong> 設計原則，100% 排除氯系（二氯甲烷等）、氟系與芳香烴類有害溶劑，VOC揮發性極低，對作業人員肺部與皮膚極度友善，廢液處理符合環保法規，真正實現電子重工與永續循環經濟的共生共榮。</p>
    `
  },
  'agri-spectral': {
    title: '光學影像與 AI：蔬果的「X光機」是如何把關甜度與品質的？',
    category: '智慧農業感測',
    colorClass: 'color-3',
    svgIcon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="#f59e0b" stroke-width="2"/>
                <path d="M8 12H16M12 8V16M12 12L15 15M12 12L9 9" stroke="#f59e0b" stroke-width="2" stroke-linecap="round"/>
              </svg>`,
    content: `
      <p>你是否買過外表飽滿紅潤，切開來內部卻早已發黑腐爛的蘋果，或毫無甜度的西瓜？在傳統農業中，蔬果品質的篩選高度依賴人工外觀觀測或隨機破壞性抽樣（榨汁測糖度）。丰泰技研研發的<strong>「蔬果品質影像分析儀」</strong>，透過多光譜成像技術與 AI 深度學習，賦予選果線一雙「透視眼」。</p>
      <h3>1. 近紅外光譜（NIRS）的無損穿透</h3>
      <p>不同化學分子對不同波長的光線具有獨特的吸收與反射指紋。例如，水果中的果糖、葡萄糖分子含有大量的 O-H 鍵與 C-H 鍵，這些化學鍵在近紅外光波段（700nm - 1100nm）會產生特定共振吸收峰。丰泰影像分析儀發射安全且高密度的光譜光線穿透蔬果果皮，收集反射或透射回來的光子數據，無須切開果實，便能在 0.5 秒內計算出糖度（Brix值）、酸度與水分含量。</p>
      <h3>2. 多光譜相機與二維空間建模</h3>
      <p>單點近紅外光譜只能測量水果的某一個局部，若病變發生在背光側便會漏檢。丰泰分析儀採用高解析度多光譜工業相機，當蔬果在輸送帶上滾動旋轉時，相機能瞬間捕捉多個特定波段的濾光畫面。AI 演算法將這些光譜圖像拼接重構，建立起整顆果實的三維光譜模型，無論是內部的褐化、水傷（Watercore）、空心，或是表皮極細微的機械擦傷與黴菌感染，均無所遁形。</p>
      <h3>3. 邊緣計算與 AI 毫秒級自動分選</h3>
      <p>一條現代化自動選果線每秒需要處理高達 10 到 15 顆水果。如此龐大的多光譜數據如果上傳雲端處理，延遲將無法想像。丰泰品質影像分析儀內部搭載高效能邊緣計算晶片（Edge TPU），運算經數百萬張選果樣本訓練的卷積神經網路（CNN）模型。AI 能在 30 毫秒內完成影像分割、光譜特徵提取與品質分級，並即時輸出指令給輸送帶的機械氣動閥，精準將「特級品」、「優等品」與「瑕疵品」分流投遞。</p>
      <h3>未來展望：從選果端延伸至產地預測</h3>
      <p>這台影像分析儀不僅是一台檢測機，更是一個農業大數據收集站。透過分析各產地、各批次的蔬果光譜數據，丰泰能協助農民回溯種植過程中的施肥與水分管理成效，預測採收後的最佳保鮮期與冷鏈運輸壽命，全面推動臺灣農業走向數據化與高值化的新農業時代。</p>
    `
  }
};

function initScienceModal() {
  const readMoreBtns = document.querySelectorAll('.science-read-more');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalHeaderImg = document.getElementById('modal-img-area');
  const modalCategory = document.getElementById('modal-category');
  const modalTitle = document.getElementById('modal-title');
  const modalContent = document.getElementById('modal-content');

  if (!modalOverlay || !modalCloseBtn) return;

  // Open modal for science articles
  readMoreBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      const article = SCIENCE_ARTICLES[id];
      
      if (article) {
        openModal(article.category, article.title, article.content, article.colorClass, article.svgIcon);
      }
    });
  });

  // Open modal for portfolio projects (Showcase detailed product specs)
  portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
      const title = item.querySelector('.portfolio-title').textContent;
      const category = item.querySelector('.portfolio-category').textContent;
      const desc = item.querySelector('.portfolio-desc').textContent;
      const cateClass = item.classList.contains('cate-agri') ? 'color-2' : (item.classList.contains('cate-chem') ? 'color-3' : 'color-1');
      const svgIcon = item.querySelector('.portfolio-img-wrapper').innerHTML;
      
      let detailedContent = `<p>${desc}</p>`;
      
      if (title.includes('影像分析儀')) {
        detailedContent += `
          <h3>技術規格與優勢</h3>
          <ul>
            <li><strong>量測時間</strong>：&le; 0.5 秒 / 顆，可無縫對接主流選果生產線。</li>
            <li><strong>糖度精準度</strong>：相對誤差 &le; &plusmn; 0.5°Brix。</li>
            <li><strong>檢測光學波段</strong>：近紅外穿透光譜 (700nm - 1050nm) + 可見光多光譜相機。</li>
            <li><strong>AI 瑕疵偵測</strong>：支持蘋果水心病、柑橘浮皮、梨子黑心、水蜜桃內部褐化檢測。</li>
          </ul>
          <h3>應用場景</h3>
          <p>適合大型農業合作社、外銷果菜包裝場、生鮮截切廠與連鎖超商採購檢驗。搭配自動化分級輸送帶，實現全天候高效品管。</p>
        `;
      } else if (title.includes('光合作用')) {
        detailedContent += `
          <h3>技術規格與優勢</h3>
          <ul>
            <li><strong>核心成分</strong>：複合有機金屬配位螯合物、誘導型小分子有機酸、微量元素 (Fe, Mg, Zn)。</li>
            <li><strong>作用機制</strong>：優化葉綠體捕光複合物，提高暗反應 Rubisco 催化活性，降低高溫光呼吸損耗。</li>
            <li><strong>適用作物</strong>：溫室番茄、草莓、瓜果類、茶樹、精緻葉菜。</li>
            <li><strong>使用方法</strong>：稀釋 800 - 1000 倍進行葉面噴施，於作物生長期每 7 - 14 天施用一次。</li>
          </ul>
          <h3>實證效益</h3>
          <p>提高葉片 SPAD 值（葉綠素相對含量），平均增產 15% - 30%，提早收穫 5 - 7 天，並提升耐陰與抗寒等抗逆境能力。</p>
        `;
      } else if (title.includes('抗黴保護劑')) {
        detailedContent += `
          <h3>技術規格與優勢</h3>
          <ul>
            <li><strong>核心成分</strong>：天然植物精油多醣複合物、食用級安全抑菌因子。</li>
            <li><strong>防護機制</strong>：在截切蔬菜或水果表面形成奈米級半透膜屏障，隔絕外源黴菌孢子侵入，並延緩呼吸作用。</li>
            <li><strong>抑菌效果</strong>：針對灰黴菌、青黴菌、根黴菌具有 99.9% 抑制效果。</li>
            <li><strong>安全性</strong>：100% 食品級無毒，無化學殘留，免水洗直接食用。</li>
          </ul>
          <h3>應用場景</h3>
          <p>鮮食截切廠（沙拉拼盤、即食水果盒）、超市生鮮包裝、連鎖餐飲食材前處理，可將冷鏈貨架壽命自 2-3 天顯著延長至 5-7 天。</p>
        `;
      } else if (title.includes('解 UV')) {
        detailedContent += `
          <h3>產品家族與應用對照</h3>
          <p>本系列專為精密光學玻璃、半導體封裝（如 Bonding Wire / BGA）及感測器載板等高價值組件設計，實現綠色、安全、無損的重工與回收。</p>
          <ul>
            <li><strong>L0-Gen-1</strong>：針對聚氨酯壓克力系 UV 膠。室溫浸泡 0.5-2 小時即可剝離，完全不傷光學玻片。</li>
            <li><strong>L0-Gen-2</strong>：針對甲基丙烯酸酯系 UV 膠。40-60°C 水浴浸泡 2-6 小時。</li>
            <li><strong>L0-Gen-3</strong>：針對環氧樹脂系 UV 膠。50-80°C 水浴浸泡 4-16 小時（對 PC 表面有輕微溶脹風險，需注意）。</li>
            <li><strong>L0-Gen-4 / LC0-Gen-5</strong>：針對高度緻密的 Epoxy/SiO2 填充膠。提供 80-100°C 高溫水浴浸泡劑 (Gen-4) 或局部垂直塗佈防滴膏 (Gen-5)，反應 24-96 小時。</li>
          </ul>
          <p><em>※ 詳情與操作請前往本站「解膠選擇器」頁面。</em></p>
        `;
      } else if (title.includes('熱固膠劑')) {
        detailedContent += `
          <h3>技術規格與優勢</h3>
          <ul>
            <li><strong>適用對象</strong>：雙劑型環氧樹脂、熱固化型結構膠、灌封用矽膠與聚氨酯結構膠。</li>
            <li><strong>運作機制</strong>：在中高溫環境下活化，破壞環氧樹脂緊密固化的三維醚鍵/酯鍵交聯點，使其產生高度膨潤並失去附著力。</li>
            <li><strong>基材安全性</strong>：不腐蝕銅、鋁、矽片、金質導線與光學玻璃。對 PC (聚碳酸酯) 有輕微溶脹性，施作時請避開 PC 殼體。</li>
            <li><strong>綠色指標</strong>：無氯、無酚、低 VOC、符合歐盟 RoHS 與 REACH 環保法規。</li>
          </ul>
          <h3>應用場景</h3>
          <p>高階晶片 BGA 封裝重工、軍工及航太電子線路板灌封膠清理、光學鏡頭模組熱固密封膠移除。</p>
        `;
      }

      openModal(category, title, detailedContent, cateClass, svgIcon);
    });
  });

  function openModal(category, title, content, colorClass, svg) {
    modalHeaderImg.className = 'modal-header-img';
    modalHeaderImg.classList.add(colorClass);
    modalHeaderImg.innerHTML = svg;

    modalCategory.textContent = category;
    modalTitle.textContent = title;
    modalContent.innerHTML = content;

    modalOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  modalCloseBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.style.display === 'flex') {
      closeModal();
    }
  });
}

/* ==========================================================================
   Contact Form Validation
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const messageBox = document.getElementById('form-message');

  if (!form || !messageBox) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const phone = document.getElementById('form-phone').value.trim();
    const subject = document.getElementById('form-subject').value.trim();
    const message = document.getElementById('form-message-input').value.trim();

    if (!name || !email || !subject || !message) {
      showMessage('請填寫所有必填欄位 (*)。', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showMessage('請輸入格式正確的電子郵件地址。', 'error');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 傳送中...';

    setTimeout(() => {
      showMessage('感謝您的來信！我們已收到您的諮詢，丰泰技研的專員將於 24 小時內與您聯繫。', 'success');
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }, 1500);
  });

  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function showMessage(msg, type) {
    messageBox.textContent = msg;
    messageBox.className = 'form-message';
    messageBox.classList.add(type);
    messageBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

/* ==========================================================================
   Portfolio Filtering Logic
   ========================================================================== */
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        if (filter === 'all' || item.classList.contains(`cate-${filter}`)) {
          item.style.display = 'flex';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}
