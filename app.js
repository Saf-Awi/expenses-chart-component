
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    
    const bars = document.querySelectorAll('.bar');
    const maxAmount = Math.max(...data.map(item => item.amount));

    data.forEach((item, index) => {
      const { day, amount } = item;

      const barHeight = (amount / maxAmount) * 200;
      bars[index].style.height = '0';
      
     
      setTimeout(() => {
        bars[index].style.height = `${barHeight}px`;
      }, 100);

      
      bars[index].addEventListener('mouseover', () => {
        const tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        tooltip.textContent = `$${amount.toFixed(2)}`;
        bars[index].appendChild(tooltip);


        const barRect = bars[index].getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        const tooltipTop = barRect.top - tooltipRect.height - 5; 
        const tooltipLeft = barRect.left + (barRect.width - tooltipRect.width) / 2;
        tooltip.style.top = `${tooltipTop}px`;
        tooltip.style.left = `${tooltipLeft}px`;
      });

      bars[index].addEventListener('mouseout', () => {
        const tooltip = bars[index].querySelector('.tooltip');
        tooltip.remove();
      });
    });
  })
  .catch(error => {
    console.error('Error fetching JSON data:', error);
  });
