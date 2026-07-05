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
  if (document.querySelector('.science-read-more')) {
    initScienceModal();
  }
  if (document.getElementById('contact-form')) {
    initContactForm();
  }
  if (document.querySelector('.filter-btn')) {
    initPortfolioFilters();
  }
  if (document.getElementById('product-detail-main')) {
    initProductDetail();
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
    const categoryEl = document.getElementById('form-category');
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

    const categoryVal = categoryEl ? categoryEl.value : 'measure';
    
    // Define access keys for each email. If placeholder key is found, fall back to Marcus's key.
    const MARCUS_KEY = '506b3292-2a33-4fb0-8606-3ff8d8eb8935';
    const KEY_MAPPING = {
      'chem': { key: 'YOUR_CHEM_ACCESS_KEY_HERE', email: 'tongsimiao@fort-instru.com', label: '化學' },
      'measure': { key: MARCUS_KEY, email: 'marcus.liang@fort-instru.com', label: '量測' },
      'agri': { key: 'YOUR_AGRI_ACCESS_KEY_HERE', email: 'tongsimiao@fort-instru.com', label: '農業' },
      'auto': { key: 'YOUR_AUTO_ACCESS_KEY_HERE', email: 'kiwi.chen@fort-instru.com', label: '自動化' }
    };

    const targetInfo = KEY_MAPPING[categoryVal] || KEY_MAPPING['measure'];
    let activeKey = targetInfo.key;
    
    // Check if the key is a placeholder or not provided
    const isPlaceholder = !activeKey || activeKey.startsWith('YOUR_');
    if (isPlaceholder) {
      activeKey = MARCUS_KEY; // Fallback to Marcus's key
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 傳送中...';

    // Build the message body to display target routing info if it was forwarded due to fallback key
    let finalMessage = `【諮詢問題歸類】：${targetInfo.label}\n`;
    finalMessage += `【應聯繫信箱】：${targetInfo.email}\n`;
    if (isPlaceholder) {
      finalMessage += `（提醒：因該部門尚未綁定 Web3Forms 金鑰，此郵件已透過 Marcus 的金鑰轉送。請手動轉寄給 ${targetInfo.email} 處理）\n`;
    }
    finalMessage += `--------------------------------------------------\n\n`;
    finalMessage += message;

    // Form data to submit to Web3Forms
    const formData = {
      access_key: activeKey,
      name: name,
      email: email,
      phone: phone || '未提供',
      subject: `[丰泰${targetInfo.label}諮詢] ${subject}`,
      message: finalMessage,
      from_name: '丰泰技研官方網站'
    };

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(async (response) => {
      let json = await response.json();
      if (response.status === 200) {
        showMessage('感謝您的來信！我們已收到您的諮詢，丰泰技研的專員將於 24 小時內與您聯繫。', 'success');
        form.reset();
      } else {
        console.error(json);
        showMessage(json.message || '傳送失敗，請稍後再試，或直接以 Email 聯絡我們。', 'error');
      }
    })
    .catch(error => {
      console.error(error);
      showMessage('連線發生錯誤，請稍後再試，或直接以 Email 聯絡我們。', 'error');
    })
    .then(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    });
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

/* ==========================================================================
   Product Detail & Case Studies Page Logic
   ========================================================================== */
const PRODUCT_DETAIL_DATA = {
  'agri-analyzer': {
    title: '蔬果品質影像分析儀',
    category: '智慧農業科技',
    categoryClass: 'badge-agri',
    icon: '<i class="fa-solid fa-crop-simple"></i>',
    desc: '專為大型選果生產線設計，結合近紅外光譜（NIRS）與邊緣 AI 深度學習。可在 0.5 秒內完成蔬果水分、糖酸比之無損檢測，並自動識別內部黑心、水傷等隱形缺陷。',
    specs: [
      { label: '量測時間', value: '≤ 0.5 秒 / 顆' },
      { label: '糖度誤差', value: '≤ ±0.5°Brix' },
      { label: '檢測波段', value: '近紅外 (700nm - 1050nm)' },
      { label: '缺陷識別率', value: '98.5%' }
    ],
    cases: [
      {
        company: '台中東勢某高階水梨出口合作社',
        tag: '外銷品管升級',
        challenge: '高價水梨（新興梨、豐水梨）極易發生內部「褐心病」（黑心），但其外觀完全完好，傳統人工肉眼無法檢測，導致出口貨櫃抵達日本與新加坡後因黑心遭大量退貨，退貨率曾高達 8% 且重創品牌信譽。',
        solution: '導入丰泰「蔬果品質影像分析儀」於選果包裝線。分選系統發射近紅外穿透光譜，透視水梨內部細胞結構，即時計算內部水分分佈與果肉健康度，自動分流病變果。',
        result: '水梨出口退貨率成功由 8% 降至 0.2% 以下；因品管精確，特級水梨的出口定價提升 25%，年盈餘增加數百萬台幣，成功維護臺灣高檔水果的國際形象。'
      }
    ]
  },
  'photo-promoter': {
    title: '光合作用促進劑肥料',
    category: '農業化材',
    categoryClass: 'badge-chem',
    icon: '<i class="fa-solid fa-flask"></i>',
    desc: '新型有機金屬配位螯合物，暫時性調整植物細胞微環境並擴大捕光範圍，大幅提升暗反應 Rubisco 碳固定酶活性，打破作物自然生理光效限制，達到低光照下依然增產之成效。',
    specs: [
      { label: '核心成分', value: '複合有機金屬配位螯合物' },
      { label: '施作方法', value: '稀釋 800 - 1000 倍葉面噴施' },
      { label: '適用作物', value: '高架草莓、溫室番茄、精緻茶葉' },
      { label: '增產成效', value: '平均產量提升 18% - 30%' }
    ],
    cases: [
      {
        company: '南投草屯高架草莓溫室農場',
        tag: '冬季逆境增產',
        challenge: '草莓產季適逢冬季，臺灣北部與中部常因連日陰雨、散射光弱，導致溫室草莓光合作用受阻，植株弱化、花芽發育不良，著果率極低，產量大幅下滑。',
        solution: '於草莓苗期及開花期，每隔 10 天噴灑一次丰泰「光合作用促進劑肥料」1000倍稀釋液，增強葉綠體在弱光下的光子捕捉效率並活化固碳暗反應。',
        result: '草莓葉片 SPAD 值（葉綠素含量）提升 22%；在冬季低溫陰雨環境下，草莓單株產量增長 28%，果實糖度平均提高 1.5 度，且提早 5 貼採收上市，搶佔高價市場。'
      }
    ]
  },
  'anti-mold': {
    title: '截切抗黴保護劑',
    category: '農業化材',
    categoryClass: 'badge-chem',
    icon: '<i class="fa-solid fa-shield-halved"></i>',
    desc: '採用食品級天然多醣與抑菌植物精油的微乳保護劑，在截切蔬菜或水果切口形成奈米級保護阻菌半透膜，阻絕灰黴菌與青黴菌侵入，顯著延緩切口氧化與變色。',
    specs: [
      { label: '安全級別', value: '100% 食品級安全無毒' },
      { label: '抑菌效率', value: '灰黴菌抑制率 ≥ 99.9%' },
      { label: '貨架壽命', value: '冷鏈下延長至 5 - 7 天' },
      { label: '食用方式', value: '免洗，可直接食用' }
    ],
    cases: [
      {
        company: '桃園生鮮沙拉截切加工廠',
        tag: '保鮮期倍增',
        challenge: '該廠主要供應北部各大超商即食水果盒與沙拉盒。蔬果截切後，切口處水分充沛且細胞受損，極易滋生黴菌，導致貨架壽命僅有 2-3 天，通路報廢率高達 15%。',
        solution: '導入丰泰「截切抗黴保護劑」，在截切加工的最後清洗步驟後，以微細霧化噴灑於切口表面，自然風乾形成奈米保護層。',
        result: '超商沙拉盒與即食水果盒在 4°C 冷鏈下的保鮮期由原本的 3 天成功延長至 6 天，通路報廢率降低了 50% 以上，為加工廠與超商通路省下大筆耗損成本。'
      }
    ]
  },
  'uv-solvent': {
    title: '安全無損解 UV 膠劑',
    category: '永續材料與化學品',
    categoryClass: 'badge-material',
    icon: '<i class="fa-solid fa-cubes"></i>',
    desc: '以溫和溶脹與界面斷鍵機制，滲透高度交聯之紫外光固化高分子網格。無氟無氯低揮發，專為精密光學鏡片重工與 CIS 感測板回收設計，不傷 PC 塑膠底板與敏感鍍膜。',
    specs: [
      { label: '適用膠體', value: 'NOA 65/72 等聚氨酯壓克力系 UV 膠' },
      { label: '反應機制', value: '物理溶脹與界面化學剝離' },
      { label: '基材安全性', value: '不傷光學玻璃、金導線、PC' },
      { label: '環保認證', value: 'RoHS, REACH 100% 符合' }
    ],
    cases: [
      {
        company: '竹科義X科技',
        tag: '量產 CIS 模組更換 PC 鏡頭',
        challenge: '義X科技在量產 CIS（影像感測）模組時，其貼合結構採用不耐化學溶劑的 PC（聚碳酸酯）塑料鏡頭外殼。一旦紫外光貼合固化後出現光學防塵不良或對準偏位，重工難度極高。過去使用丙酮或常規氯系溶劑清除膠體，會使 PC 鏡片溶脹、發白並產生微裂紋，導致高價值 CIS 模組只能直接報廢。',
        solution: '導入丰泰「安全無損解 UV 膠劑 L0-Gen-1/Gen-2」。藉由精確配比的溶脹剝離因子深入交聯網格，僅弱化 UV 膠體附著力，而 PC 鏡片與 CIS 晶片底板在此溶劑中維持完全惰性，無任何化學溶脹反應。',
        result: '成功在 PC 鏡頭與 CIS 感光晶片 100% 無損、無發白發脆的狀態下完成鏡頭剝離與更換。使量產重工合格率大幅提升至 99.5% 以上，顯著降低了高階感測模組生產損耗。'
      },
      {
        company: '竹科鴻X半導體',
        tag: '矽光子 FAU 更換重工',
        challenge: '在高階矽光子封裝中，Fiber Array Unit（FAU，光纖陣列單元）需要與矽光波導晶圓進行精密對準並以高粘度 UV 膠貼合。若對準出現微米級偏位或後續電性測試不合格，必須將 FAU 拆解更換。由於石英 FAU 基底與矽光晶片極度脆弱微小，傳統機械撬除或加溫極易造成矽光晶圓端面崩角（Chipping）或光纖斷裂，導致昂貴晶圓報廢。',
        solution: '採用丰泰研發之低黏度、低表面張力「安全無損解 UV 膠劑 L0-Gen-1」。利用強大毛細作用讓解膠液在數分鐘內快速滲透進僅有數微米（μm）的狹窄貼合間隙，溫和破壞交聯界面，使 UV 膠弱化。',
        result: 'FAU 與矽光晶圓波導端面實現完全無損的剝離分離，晶圓端面無任何崩角、刮傷或鍍膜剝落，且石英 FAU 基底清理後可重複投入使用。晶片重工良率達到 98.8%，為 CPO（共同封裝光學）製程提供了可靠的重工手段。'
      }
    ]
  },
  'heat-solvent': {
    title: '安全無損解熱固膠劑',
    category: '永續材料與化學品',
    categoryClass: 'badge-material',
    icon: '<i class="fa-solid fa-recycle"></i>',
    desc: '熱活化特用溶劑配方，可切入雙劑環氧樹脂等熱固性膠體之緻密醚鍵交聯網格，使其軟化膨潤並喪失附著力，適用於 BGA 封裝晶片重工與軍工封膠線路板完好拆解。',
    specs: [
      { label: '適用膠體', value: '雙劑型環氧樹脂、熱固化結構膠' },
      { label: '工作溫度', value: '50°C - 80°C 水浴或烘箱' },
      { label: '清除效率', value: '4 - 16 小時使膠體完全膨潤弱化' },
      { label: '腐蝕性', value: '對銅、鋁、矽片、金質導線無腐蝕' }
    ],
    cases: [
      {
        company: '內湖科學園區高階車載晶片封裝廠',
        tag: '高價值 IC 重工回收',
        challenge: '車載控制模組在封測階段常進行環氧樹脂（Epoxy）整體灌封以耐震防水。一旦組裝測試發現部分元件故障，由於熱固性環氧樹脂具有極佳的耐高溫與耐溶劑性，極難移除，導致整塊價值數萬元的車載板被迫報廢。',
        solution: '導入丰泰「安全無損解熱固膠劑 L0-Gen-3 / L0-Gen-4」。在 80°C 水浴加熱輔助下，解膠分子深入高度密實的環氧樹脂網格使其軟化呈粉末或膨潤果凍狀，再以精密清洗劑沖洗。',
        result: '在不傷及線路板上金導線與矽晶片的前提下，完好將固化封膠清除，成功更換故障元件並重組，救回價值昂貴的車載主控板，單一產線每月節省百萬重工成本。'
      }
    ]
  }
};

function initProductDetail() {
  const sidebarMenu = document.getElementById('product-sidebar-menu');
  const mainContent = document.getElementById('product-detail-main');
  
  if (!sidebarMenu || !mainContent) return;

  // Get selected product id from URL query (?id=xxx)
  const urlParams = new URLSearchParams(window.location.search);
  let activeId = urlParams.get('id');
  
  // Default to first product if none specified or invalid
  if (!activeId || !PRODUCT_DETAIL_DATA[activeId]) {
    activeId = 'agri-analyzer';
  }

  // Render Sidebar Menu
  sidebarMenu.innerHTML = '';
  Object.keys(PRODUCT_DETAIL_DATA).forEach(key => {
    const item = PRODUCT_DETAIL_DATA[key];
    const link = document.createElement('a');
    link.href = `product-detail.html?id=${key}`;
    link.className = `sidebar-item ${key === activeId ? 'active' : ''}`;
    link.innerHTML = `
      <span class="sidebar-item-icon">${item.icon}</span>
      <span>${item.title}</span>
    `;
    sidebarMenu.appendChild(link);
  });

  // Render Main Content
  const data = PRODUCT_DETAIL_DATA[activeId];
  
  // Specs rendering
  let specsHtml = '';
  data.specs.forEach(spec => {
    specsHtml += `
      <div class="spec-item">
        <div class="spec-label">${spec.label}</div>
        <div class="spec-value">${spec.value}</div>
      </div>
    `;
  });

  // Case Studies rendering
  let casesHtml = '';
  data.cases.forEach(c => {
    casesHtml += `
      <div class="case-study-card">
        <div class="case-header">
          <span class="case-company"><i class="fa-solid fa-circle-check" style="color: var(--plant-green); margin-right: 6px;"></i> ${c.company}</span>
          <span class="case-tag">${c.tag}</span>
        </div>
        
        <div class="case-challenge">
          <h5><i class="fa-solid fa-triangle-exclamation"></i> 面臨挑戰 (Challenge)</h5>
          <p style="font-size: 0.95rem; margin-bottom: 0; line-height: 1.5; color: var(--text-muted);">${c.challenge}</p>
        </div>
        
        <div class="case-solution">
          <h5><i class="fa-solid fa-lightbulb"></i> 丰泰技術解決方案 (Solution)</h5>
          <p style="font-size: 0.95rem; margin-bottom: 0; line-height: 1.5; color: var(--text-muted);">${c.solution}</p>
        </div>
        
        <div class="case-result">
          <h5><i class="fa-solid fa-chart-line"></i> 實際成果與效益 (Result)</h5>
          <p>${c.result}</p>
        </div>
      </div>
    `;
  });

  mainContent.innerHTML = `
    <div class="product-detail-header">
      <span class="product-detail-badge ${data.categoryClass}">${data.category}</span>
      <h1 class="product-detail-title">${data.title}</h1>
      <p class="product-detail-desc">${data.desc}</p>
    </div>
    
    <div class="product-specs-section">
      <h3 class="product-spec-title"><i class="fa-solid fa-microchip"></i> 技術指標與規格</h3>
      <div class="product-spec-grid">
        ${specsHtml}
      </div>
    </div>
    
    <div class="case-study-section">
      <h3 class="case-study-title"><i class="fa-solid fa-file-invoice"></i> 相關實際成功案例</h3>
      <div class="case-study-list">
        ${casesHtml}
      </div>
    </div>
    
    <div style="margin-top: 40px; border-top: 1px solid var(--border-light); padding-top: 30px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
      <div>
        <h5 style="font-weight: 700; color: var(--text-main); margin-bottom: 4px;">對此產品有興趣，或有客製化打樣需求？</h5>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">丰泰專業研發團隊為您量身打造測試方案與評估服務。</p>
      </div>
      <a href="contact.html" class="btn btn-primary"><i class="fa-solid fa-paper-plane"></i> 聯絡諮詢產品</a>
    </div>
  `;
}
