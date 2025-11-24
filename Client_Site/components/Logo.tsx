import imgLogo from 'figma:asset/f7c777f1b7230994f0f5a37a74210c543bc73f6a.png';
import imgLogoIcon from 'figma:asset/4b4bad59041302b06eae37218f1d3bd7c64d7d1e.png';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'icon';
}

export function Logo({ className = '', variant = 'full' }: LogoProps) {
  if (variant === 'icon') {
    return (
      <div className={`flex items-center ${className}`}>
        <img 
          src={imgLogoIcon} 
          alt="Kash Contact" 
          className="h-full w-auto"
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src={imgLogo} 
        alt="Kash Contact" 
        className="h-full w-auto"
      />
    </div>
  );
}