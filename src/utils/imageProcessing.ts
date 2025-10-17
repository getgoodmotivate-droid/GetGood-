export const compressImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        // Set max dimensions
        const maxWidth = 800;
        const maxHeight = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const createBeforeAfterImage = (
  beforeImg: string,
  afterImg: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    const img1 = new Image();
    const img2 = new Image();
    
    let loadedCount = 0;
    const checkBothLoaded = () => {
      loadedCount++;
      if (loadedCount === 2) {
        // Create side-by-side comparison
        const width = 1200;
        const height = 600;
        const padding = 20;
        const textHeight = 50;
        
        canvas.width = width;
        canvas.height = height + textHeight * 2;
        
        // Background
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Title
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 32px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('My Transformation Journey', width / 2, 40);
        
        // Draw images
        const imgWidth = (width - padding * 3) / 2;
        const imgHeight = height - textHeight;
        
        // Before image
        ctx.drawImage(img1, padding, textHeight + padding, imgWidth, imgHeight);
        ctx.fillStyle = '#0ea5e9';
        ctx.font = 'bold 24px Arial';
        ctx.fillText('BEFORE', padding + imgWidth / 2, height + textHeight + 35);
        
        // After image
        ctx.drawImage(img2, padding * 2 + imgWidth, textHeight + padding, imgWidth, imgHeight);
        ctx.fillText('AFTER', padding * 2 + imgWidth + imgWidth / 2, height + textHeight + 35);
        
        // Watermark
        ctx.fillStyle = '#64748b';
        ctx.font = '18px Arial';
        ctx.fillText('Made with gEtgOOd', width / 2, height + textHeight + 65);
        
        resolve(canvas.toDataURL('image/png'));
      }
    };
    
    img1.onload = checkBothLoaded;
    img2.onload = checkBothLoaded;
    img1.onerror = reject;
    img2.onerror = reject;
    
    img1.src = beforeImg;
    img2.src = afterImg;
  });
};

