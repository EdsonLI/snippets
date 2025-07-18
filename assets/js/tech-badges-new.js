/**
 * Tech Badges - Sistema dinâmico para badges de tecnologia
 * Transforma spans com classes id-tech-* em badges estilizadas com ícones
 * 
 * @author GitHub Copilot
 * @version 1.0.1
 */
document.addEventListener('DOMContentLoaded', function() {
  // Mapeamento de tecnologias para seus respectivos ícones
  const TECH_ICONS = {
    // Tecnologias implementadas - usando versões coloridas (brandings originais)
    'sql': 'custom-sql-svg', // Usando SVG customizado definido no CSS
    'html': 'logos:html-5',
    'css': 'logos:css-3',
    'javascript': 'logos:javascript',
    'js': 'logos:javascript',
    'php': 'custom-php-svg', // Usando SVG customizado definido no CSS
    'bootstrap': 'logos:bootstrap',
    'jquery': 'logos:jquery',
    'git': 'custom-git-svg', // Usando SVG customizado definido no CSS
    'fontawesome': 'logos:font-awesome',
    'isotope': 'carbon:chart-network',
    'vscode': 'logos:visual-studio-code',
    'sweetalert2': 'logos:sweetalert2',
    'codepen': 'logos:codepen-icon',
    'madbuilder': 'fluent-emoji:hammer-and-wrench',
    
    // Tecnologias adicionais - versões coloridas
    'react': 'logos:react',
    'vue': 'logos:vue',
    'angular': 'logos:angular-icon',
    'node': 'logos:nodejs-icon',
    'python': 'logos:python',
    'java': 'logos:java',
    'csharp': 'logos:c-sharp',
    'ruby': 'logos:ruby',
    'typescript': 'logos:typescript-icon',
    'graphql': 'logos:graphql',
    'mongodb': 'logos:mongodb-icon',
    'mysql': 'logos:mysql',
    'postgresql': 'logos:postgresql',
    'aws': 'logos:aws',
    'docker': 'logos:docker-icon',
    'kubernetes': 'logos:kubernetes',
    'laravel': 'logos:laravel',
    'dotnet': 'logos:dotnet',
    'flutter': 'logos:flutter'
  };

  // Função para transformar spans em badges
  function transformTechBadges() {
    // Encontrar todos os spans de tecnologia (formato id-tech-*) que ainda não foram processados
    const techSpans = document.querySelectorAll('[class*="id-tech-"]:not([data-tech-processed])');
    
    techSpans.forEach(span => {
      // Obter o tipo de tecnologia a partir da classe
      const classes = Array.from(span.classList);
      const techClass = classes.find(cls => cls.startsWith('id-tech-'));
      
      if (!techClass) return;
      
      const tech = techClass.replace('id-tech-', '').toLowerCase();
      
      // Adicionar a classe de badge
      span.classList.add('tech-badge', `tech-badge-${tech}`);
      
      // Caso especial para jQuery - usar um SVG customizado
      if (tech === 'jquery') {
        // Remover ícones existentes para jQuery
        const existingIcons = span.querySelectorAll('iconify-icon, .jquery-icon');
        existingIcons.forEach(icon => icon.remove());
        
        // Criar um elemento SVG para jQuery
        const jQueryIcon = document.createElement('span');
        jQueryIcon.className = 'jquery-icon tech-icon-custom';
        jQueryIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="16" height="16" style="aspect-ratio: 1/1;">
          <path fill="#0868AC" d="M9.625 32.181C-1.404 48.032-.031 68.657 8.394 85.501c.2.404.41.801.617 1.198l.394.759.246.437.439.786c.262.461.53.92.804 1.379l.459.756c.304.491.615.976.933 1.46l.398.614c.439.655.888 1.309 1.352 1.951l.039.05.228.308c.401.553.814 1.099 1.232 1.639l.464.59c.373.469.752.935 1.138 1.399l.435.52a75.27 75.27 0 001.586 1.812l.033.033.061.068a80.44 80.44 0 001.612 1.699l.517.521c.423.426.853.845 1.287 1.262l.527.5c.58.547 1.166 1.083 1.764 1.607l.028.022.307.262c.527.456 1.063.909 1.603 1.353l.664.529c.441.354.887.702 1.336 1.044l.714.543c.496.365.995.724 1.499 1.075l.546.387.15.107c.478.329.967.646 1.456.963l.63.42c.75.474 1.51.943 2.279 1.396l.63.355c.565.326 1.134.646 1.71.959.312.168.632.327.946.488.407.213.811.429 1.225.636l.283.137.501.242c.641.306 1.287.607 1.94.897l.41.184a66.92 66.92 0 002.263.941l.551.217c.704.271 1.418.539 2.135.791l.268.093c.787.275 1.581.53 2.381.779l.575.172c.814.245 1.619.538 2.458.693 53.339 9.727 68.833-32.053 68.833-32.053-13.013 16.953-36.111 21.425-57.996 16.446-.829-.187-1.633-.446-2.442-.685l-.609-.185a72.498 72.498 0 01-2.352-.765l-.323-.117a72.245 72.245 0 01-2.074-.769l-.582-.229c-.752-.297-1.5-.607-2.239-.931l-.447-.198a92.857 92.857 0 01-1.889-.879l-.546-.262c-.491-.239-.977-.493-1.461-.743-.324-.171-.654-.332-.975-.51a58.591 58.591 0 01-1.751-.982l-.591-.33a81.221 81.221 0 01-2.28-1.397l-.615-.41a59.283 59.283 0 01-1.623-1.079l-.522-.367a89.287 89.287 0 01-1.534-1.109l-.679-.514a64.473 64.473 0 01-1.384-1.082l-.617-.495a82.693 82.693 0 01-1.724-1.453l-.189-.159a83.466 83.466 0 01-1.812-1.647l-.511-.491c-.441-.42-.875-.843-1.302-1.277l-.51-.509a70.541 70.541 0 01-1.598-1.69l-.079-.084a67.39 67.39 0 01-1.621-1.844l-.424-.504a70.602 70.602 0 01-1.167-1.442l-.427-.532a78.406 78.406 0 01-1.347-1.794c-12.15-16.574-16.516-39.432-6.805-58.204m25.629-2.434c-7.977 11.478-7.543 26.844-1.321 38.983a50.581 50.581 0 003.528 5.889c1.195 1.713 2.52 3.751 4.106 5.127a48.111 48.111 0 001.79 1.858l.472.465a51.69 51.69 0 001.828 1.698l.074.064.018.018a55.268 55.268 0 002.135 1.767l.485.378a54.08 54.08 0 002.233 1.631l.065.049c.336.232.678.448 1.019.672l.483.319c.544.349 1.095.689 1.655 1.015l.235.136c.483.278.972.552 1.463.818l.521.271c.339.177.678.358 1.023.53l.155.07c.703.346 1.412.68 2.136.995l.472.194c.579.246 1.164.486 1.75.71l.75.275c.533.198 1.068.378 1.607.559l.727.233c.767.238 1.525.539 2.324.672 41.183 6.823 50.691-24.886 50.691-24.886-8.57 12.343-25.168 18.233-42.879 13.635a50.376 50.376 0 01-2.333-.674l-.701-.227a45.423 45.423 0 01-1.631-.562l-.736-.274a56.418 56.418 0 01-1.756-.708l-.473-.2a47.728 47.728 0 01-2.148-.999c-.363-.177-.72-.364-1.078-.548l-.622-.32a44.502 44.502 0 01-1.363-.77l-.326-.185a47.844 47.844 0 01-1.651-1.008l-.498-.332a61.759 61.759 0 01-1.069-.707 57.456 57.456 0 01-2.226-1.628l-.501-.395c-7.752-6.12-13.898-14.486-16.819-23.971-3.062-9.836-2.402-20.878 2.903-29.84m22.278-.775c-4.702 6.92-5.164 15.514-1.901 23.156 3.441 8.113 10.491 14.476 18.72 17.495.339.125.679.237 1.022.354l.451.143c.485.152.966.329 1.467.424 22.74 4.394 28.908-11.669 30.549-14.034-5.402 7.779-14.482 9.646-25.623 6.942-.88-.213-1.847-.531-2.695-.832a33.242 33.242 0 01-3.201-1.329 33.215 33.215 0 01-5.612-3.424c-9.969-7.565-16.162-21.994-9.657-33.745"></path>
        </svg>`;
        
        // Inserir o ícone no DOM antes do texto
        span.insertBefore(jQueryIcon, span.firstChild);
      }
      // Caso especial para SQL - não fazemos nada aqui
      // O ícone SQL é gerenciado completamente pelo arquivo sql-icon-fix.js
      else if (tech === 'sql') {
        // Apenas marcamos como processado e deixamos o sql-icon-fix.js fazer o trabalho
        span.setAttribute('data-sql-badge', 'true');
      }
      // Caso especial para Git - gerenciado pelo arquivo git-icon-fix.js
      else if (tech === 'git') {
        // Apenas marcamos como processado e deixamos o git-icon-fix.js fazer o trabalho
        span.setAttribute('data-git-badge', 'true');
      }
      // Caso especial para PHP - gerenciado pelo arquivo php-icon-fix.js
      else if (tech === 'php') {
        // Apenas marcamos como processado e deixamos o php-icon-fix.js fazer o trabalho
        span.setAttribute('data-php-badge', 'true');
      }
      // Caso especial para Bootstrap - usar um SVG customizado
      else if (tech === 'bootstrap') {
        // Remover ícones existentes para Bootstrap
        const existingIcons = span.querySelectorAll('iconify-icon, .bootstrap-icon');
        existingIcons.forEach(icon => icon.remove());
        
        // Criar um elemento SVG para Bootstrap
        const bootstrapIcon = document.createElement('span');
        bootstrapIcon.className = 'bootstrap-icon tech-icon-custom';
        bootstrapIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="16" height="16" style="aspect-ratio: 1/1;">
          <defs>
            <linearGradient id="bootstrap-a" x1="76.079" x2="523.48" y1="10.798" y2="365.95" gradientTransform="translate(1.11 14.613) scale(.24566)" gradientUnits="userSpaceOnUse">
              <stop offset="0" stop-color="#9013fe"></stop>
              <stop offset="1" stop-color="#6610f2"></stop>
            </linearGradient>
            <linearGradient id="bootstrap-b" x1="193.51" x2="293.51" y1="109.74" y2="278.87" gradientTransform="translate(0 52)" gradientUnits="userSpaceOnUse">
              <stop offset="0" stop-color="#fff"></stop>
              <stop offset="1" stop-color="#f1e5fc"></stop>
            </linearGradient>
            <filter id="bootstrap-c" width="197" height="249" x="161.9" y="135.46" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse">
              <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
              <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
              <feOffset dy="4"></feOffset>
              <feGaussianBlur stdDeviation="8"></feGaussianBlur>
              <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"></feColorMatrix>
              <feBlend in2="BackgroundImageFix" result="effect1_dropShadow"></feBlend>
              <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"></feBlend>
            </filter>
          </defs>
          <path fill="url(#bootstrap-a)" d="M14.985 27.712c-.237-6.815 5.072-13.099 12.249-13.099h73.54c7.177 0 12.486 6.284 12.249 13.099-.228 6.546.068 15.026 2.202 21.94 2.141 6.936 5.751 11.319 11.664 11.883v6.387c-5.913.564-9.523 4.947-11.664 11.883-2.134 6.914-2.43 15.394-2.202 21.94.237 6.815-5.072 13.098-12.249 13.098h-73.54c-7.177 0-12.486-6.284-12.249-13.098.228-6.546-.068-15.026-2.203-21.94-2.14-6.935-5.76-11.319-11.673-11.883v-6.387c5.913-.563 9.533-4.947 11.673-11.883 2.135-6.914 2.43-15.394 2.203-21.94z"></path>
          <path fill="url(#bootstrap-b)" d="M267.1 364.46c47.297 0 75.798-23.158 75.798-61.355 0-28.873-20.336-49.776-50.532-53.085v-1.203c22.185-3.609 39.594-24.211 39.594-47.219 0-32.783-25.882-54.138-65.322-54.138h-88.74v217zm-54.692-189.48h45.911c24.958 0 39.131 11.128 39.131 31.279 0 21.505-16.484 33.535-46.372 33.535h-38.67zm0 161.96v-71.431h45.602c32.661 0 49.608 12.03 49.608 35.49 0 23.459-16.484 35.941-47.605 35.941z" filter="url(#bootstrap-c)" transform="translate(1.494 2.203) scale(.24566)"></path>
        </svg>`;
        
        // Inserir o ícone no DOM antes do texto
        span.insertBefore(bootstrapIcon, span.firstChild);
      }
      // Caso especial para W3Schools - usar um SVG customizado
      else if (tech === 'w3schools') {
        // Remover ícones existentes para W3Schools
        const existingIcons = span.querySelectorAll('iconify-icon, .w3schools-icon');
        existingIcons.forEach(icon => icon.remove());
        
        // Criar um elemento SVG para W3Schools
        const w3schoolsIcon = document.createElement('span');
        w3schoolsIcon.className = 'w3schools-icon tech-icon-custom';
        w3schoolsIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54 50.8" width="16" height="16" style="aspect-ratio: 1/1;">
          <defs>
            <clipPath id="w3schools-clip0">
              <rect width="37.2768" height="35" fill="white"/>
            </clipPath>
          </defs>
          <g clip-path="url(#w3schools-clip0)" transform="matrix(1.451231002808, 0, 0, 1.451231002808, -0.053854331374, -2.645e-9)" style="">
            <path d="M31.3987 7.36607C31.3987 7.36607 32.3362 8.37054 33.6458 8.37054C34.68 8.37054 35.4315 7.74554 35.4315 6.88988C35.4315 5.84077 34.4716 5.35714 33.3109 5.35714H32.6264L32.2172 4.43452L34.0327 2.28423C34.4196 1.82292 34.7469 1.53274 34.7469 1.53274C34.7469 1.53274 34.4568 1.54762 33.869 1.54762H30.9151V0L36.9642 0V1.13095L34.5386 3.93601C35.9077 4.12946 37.2469 5.10417 37.2469 6.82292C37.2469 8.51191 35.9672 10.0744 33.7574 10.0744C31.6517 10.0744 30.4836 8.75 30.4836 8.75L31.3987 7.36607Z" fill="#04AA6D"/>
            <path d="M19.5981 9.45695L27.5892 23.6831L31.5326 16.6519L23.988 3.22183H15.2082L11.5698 9.70249L7.93146 3.22183H0.0371094L11.5252 23.6831L11.5698 23.6087L11.6145 23.6831L19.5981 9.45695Z" fill="#04AA6D"/>
            <path d="M0.118958 33.3257H1.28711C1.28711 33.668 1.58473 33.9954 2.11301 33.9954C2.60408 33.9954 2.93146 33.7498 2.93146 33.4224C2.93146 33.1397 2.71568 33.0132 2.34366 32.9314L1.67402 32.7602C0.543065 32.4626 0.252886 31.8599 0.252886 31.2201C0.252886 30.4388 1.0267 29.7245 2.12045 29.7245C3.0133 29.7245 4.02521 30.1784 4.01033 31.2945H2.82729C2.82729 30.9522 2.51479 30.7364 2.15765 30.7364C1.77074 30.7364 1.50289 30.9596 1.50289 31.2721C1.50289 31.5326 1.74842 31.6814 2.0386 31.7483L2.84217 31.9641C3.97312 32.2543 4.17402 32.9611 4.17402 33.4224C4.17402 34.4418 3.15467 34.9998 2.13533 34.9998C1.14574 34.9998 0.141279 34.3971 0.118958 33.3257Z" fill="#04AA6D"/>
            <path d="M5.20837 32.3584C5.20837 30.7662 6.48814 29.7245 7.93903 29.7245C8.80956 29.7245 9.51641 30.1114 9.97772 30.6918L9.09974 31.3912C8.83933 31.0787 8.41522 30.8852 7.96135 30.8852C7.09081 30.8852 6.46581 31.5102 6.46581 32.3584C6.46581 33.1992 7.09081 33.8391 7.96135 33.8391C8.41522 33.8391 8.83933 33.6457 9.09974 33.3332L9.97772 34.0326C9.51641 34.6129 8.80956 34.9998 7.93903 34.9998C6.48814 34.9998 5.20837 33.9507 5.20837 32.3584Z" fill="#04AA6D"/>
            <path d="M15.9895 32.0535V34.866H14.7395V32.1428C14.7395 31.3392 14.2559 30.9077 13.6979 30.9077C13.1249 30.9077 12.4181 31.2425 12.4181 32.2172V34.8735H11.1681V27.1205H12.4255V30.6101C12.6711 29.9999 13.4821 29.7172 13.9806 29.7172C15.2752 29.7246 15.9895 30.5952 15.9895 32.0535Z" fill="#04AA6D"/>
            <path d="M17.299 32.3584C17.299 30.7662 18.5341 29.7245 19.9626 29.7245C21.3912 29.7245 22.6412 30.7662 22.6412 32.3584C22.6412 33.9507 21.3912 34.9998 19.9626 34.9998C18.5341 34.9998 17.299 33.9507 17.299 32.3584ZM21.3838 32.3584C21.3838 31.4954 20.7364 30.8852 19.9626 30.8852C19.1888 30.8852 18.5564 31.4954 18.5564 32.3584C18.5564 33.2364 19.1888 33.8391 19.9626 33.8391C20.7364 33.8391 21.3838 33.2364 21.3838 32.3584Z" fill="#04AA6D"/>
            <path d="M23.7053 32.3584C23.7053 30.7662 24.9404 29.7245 26.369 29.7245C27.7975 29.7245 29.0475 30.7662 29.0475 32.3584C29.0475 33.9507 27.7975 34.9998 26.369 34.9998C24.9478 34.9998 23.7053 33.9507 23.7053 32.3584ZM27.7901 32.3584C27.7901 31.4954 27.1428 30.8852 26.369 30.8852C25.5951 30.8852 24.9627 31.4954 24.9627 32.3584C24.9627 33.2364 25.5951 33.8391 26.369 33.8391C27.1502 33.8391 27.7901 33.2364 27.7901 32.3584Z" fill="#04AA6D"/>
            <path d="M30.4314 34.8735V27.1205H31.6814V34.8735H30.4314Z" fill="#04AA6D"/>
            <path d="M33.0431 33.3257H34.2112C34.2112 33.668 34.5089 33.9954 35.0371 33.9954C35.5282 33.9954 35.8556 33.7498 35.8556 33.4224C35.8556 33.1397 35.6398 33.0132 35.2678 32.9314L34.5982 32.7602C33.4672 32.4626 33.177 31.8599 33.177 31.2201C33.177 30.4388 33.9508 29.7245 35.0446 29.7245C35.9374 29.7245 36.9493 30.1784 36.9345 31.2945H35.744C35.744 30.9522 35.4315 30.7364 35.0743 30.7364C34.6874 30.7364 34.4196 30.9596 34.4196 31.2721C34.4196 31.5326 34.6651 31.6814 34.9553 31.7483L35.7589 31.9641C36.8898 32.2543 37.0907 32.9611 37.0907 33.4224C37.0907 34.4418 36.0714 34.9998 35.052 34.9998C34.0624 34.9998 33.0654 34.3971 33.0431 33.3257Z" fill="#04AA6D"/>
          </g>
        </svg>`;
        
        // Inserir o ícone no DOM antes do texto
        span.insertBefore(w3schoolsIcon, span.firstChild);
      }
      // Caso especial para CSS - usar um SVG customizado
      else if (tech === 'css') {
        // Remover ícones existentes para CSS
        const existingIcons = span.querySelectorAll('iconify-icon, .css-icon');
        existingIcons.forEach(icon => icon.remove());
        
        // Criar um elemento SVG para CSS
        const cssIcon = document.createElement('span');
        cssIcon.className = 'css-icon tech-icon-custom';
        cssIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="16" height="16" style="aspect-ratio: 1/1;">
          <path fill="#1572B6" d="M18.814 114.123L8.76 1.352h110.48l-10.064 112.754-45.243 12.543-45.119-12.526z"></path>
          <path fill="#33A9DC" d="M64.001 117.062l36.559-10.136 8.601-96.354h-45.16v106.49z"></path>
          <path fill="#fff" d="M64.001 51.429h18.302l1.264-14.163H64.001V23.435h34.682l-.332 3.711-3.4 38.114h-30.95V51.429z"></path>
          <path fill="#EBEBEB" d="M64.083 87.349l-.061.018-15.403-4.159-.985-11.031H33.752l1.937 21.717 28.331 7.863.063-.018v-14.39z"></path>
          <path fill="#fff" d="M81.127 64.675l-1.666 18.522-15.426 4.164v14.39l28.354-7.858.208-2.337 2.406-26.881H81.127z"></path>
          <path fill="#EBEBEB" d="M64.048 23.435v13.831H30.64l-.277-3.108-.63-7.012-.331-3.711h34.646zm-.047 27.996v13.831H48.792l-.277-3.108-.631-7.012-.33-3.711h16.447z"></path>
        </svg>`;
        
        // Inserir o ícone no DOM antes do texto
        span.insertBefore(cssIcon, span.firstChild);
      }
      // Caso especial para Isotope - usar a imagem personalizada
      else if (tech === 'isotope') {
        // Remover ícones existentes para Isotope
        const existingIcons = span.querySelectorAll('iconify-icon, .isotope-icon');
        existingIcons.forEach(icon => icon.remove());
        
        // Criar um elemento de imagem para o Isotope
        const isotopeIcon = document.createElement('img');
        isotopeIcon.className = 'isotope-icon tech-icon-custom';
        isotopeIcon.src = '/snippets/assets/img/isotope.png';
        isotopeIcon.alt = 'Isotope';
        isotopeIcon.width = 20;
        isotopeIcon.height = 20;
        
        // Inserir o ícone no DOM antes do texto
        span.insertBefore(isotopeIcon, span.firstChild);
      } else {
        // Para todas as outras tecnologias, continuar com o comportamento normal
        const icon = TECH_ICONS[tech] || 'mdi:code-tags';
        
        // Verificar se já existe um ícone antes de adicionar um novo
        const existingIcon = span.querySelector('iconify-icon');
        if (!existingIcon) {
          // Adicionar o ícone no início do texto
          const iconElement = document.createElement('iconify-icon');
          iconElement.setAttribute('icon', icon);
          iconElement.style.verticalAlign = 'middle';
          iconElement.setAttribute('width', '20px');
          iconElement.setAttribute('height', '20px');
          iconElement.style.backgroundColor = 'white';
          iconElement.style.borderRadius = '50%';
          iconElement.style.padding = '2px';
          iconElement.style.boxShadow = '0 0 2px rgba(0,0,0,0.2)';
          
          // Insere o ícone no DOM
          span.insertBefore(iconElement, span.firstChild);
        }
      }
      
      // Marcar como processado para evitar processamento duplicado
      span.setAttribute('data-tech-processed', 'true');
    });
  }

  // Inicializar as badges
  transformTechBadges();
  
  // Evento para recarregar ícones quando solicitado
  document.addEventListener('reload-tech-badges', function() {
    console.info('🔄 Processando ícones após evento de recarga...');
    transformTechBadges();
  });
  
  // Para suportar carregamento dinâmico de conteúdo
  // Observe o DOM para novos elementos
  const observer = new MutationObserver(mutations => {
    let shouldTransform = false;
    
    mutations.forEach(mutation => {
      if (mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) {
            // Verificar se o próprio nó contém a classe id-tech-*
            if (node.classList && Array.from(node.classList).some(cls => cls.startsWith('id-tech-')) && !node.hasAttribute('data-tech-processed')) {
              shouldTransform = true;
            }
            // Verificar se algum filho contém a classe id-tech-*
            else if (node.querySelector && node.querySelector('[class*="id-tech-"]:not([data-tech-processed])')) {
              shouldTransform = true;
            }
          }
        });
      }
    });
    
    if (shouldTransform) {
      transformTechBadges();
    }
  });
  
  // Configurar o observer para monitorar adições de nós em todo o documento
  observer.observe(document.body, { childList: true, subtree: true });
  
  console.info('✅ Tech Badges: Sistema inicializado com sucesso!');
});
