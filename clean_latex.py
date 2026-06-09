import os
import re

def clean_content(content):
    # First, run specific string replacements to handle latex commands
    replacements = [
        ('\\cdot', '·'),
        ('\\oplus', '⊕'),
        ('\\leftarrow', '←'),
        ('\\rightarrow', '→'),
        ('\\pm', '±'),
        ('\\times', 'x'),
        ('\\Delta t', 'Δt'),
        ('\\approx', '≈'),
        ('\\overline{WR}', 'WR̅'),
        ('\\overline{DEN}', 'DEN̅'),
        ('DT/\\overline{R}', 'DT/R̅'),
        ('\\overline{BHE}', 'BHE̅'),
        ('\\overline{RD}', 'RD̅'),
        ('\\Sigma', 'Σ'),
        ('\\bmod', 'mod'),
        ('\\text{Total Access Time} = \\text{Seek Time} + \\text{Rotational Delay} + \\text{Transfer Time}', 'Total Access Time = Seek Time + Rotational Delay + Transfer Time'),
        ('\\text{Average Rotational Delay} = \\frac{1}{2} \\times \\frac{60}{\\text{RPM}}\\text{ seconds}', 'Average Rotational Delay = 1/2 * (60 / RPM) seconds'),
        ('\\text{Cache Line} = (\\text{Memory Block}) mod (\\text{Total Lines})', 'Cache Line = (Memory Block) mod (Total Lines)'),
        ('\\text{Physical Address} = (\\text{Segment Register} \\times 10\\text{H}) + \\text{Offset Register}', 'Physical Address = (Segment Register * 10H) + Offset Register'),
        ('\\text{Physical Address} = (\\text{Segment Register} \\times 10\\text{H}) + \\text{Offset}', 'Physical Address = (Segment Register * 10H) + Offset'),
        ('\\text{IVT Address} = \\text{Interrupt Type} \\times 4', 'IVT Address = Interrupt Type * 4'),
        ('\\mathbf{1111\\ 0100}', '1111 0100'),
        ('\\mathbf{0000\\ 1011}', '0000 1011'),
        ('\\mathbf{0000\\ 1100}', '0000 1100'),
        ('\\mathbf{11111\\ 10001}', '11111 10001'),
        ('\\mathbf{-15}', '-15'),
        ('\\mathbf{00101}', '00101'),
        ('\\mathbf{11011}', '11011'),
        ('\\mathbf{11101}', '11101'),
        ('\\mathbf{0011}', '0011'),
        ('\\mathbf{1101}', '1101'),
        ('\\mathbf{1100}', '1100'),
        ('\\frac{1}{2}', '1/2')
    ]
    
    # Specific string replaces
    for pattern, replacement in replacements:
        content = content.replace(pattern, replacement)
        
    # Remove any remaining single dollar signs around variables or formulas
    content = re.sub(r'\$([^\$\n]+)\$', r'\1', content)
    
    # Secondary cleanup for standard math symbols in case they were left in different formats
    content = content.replace(r'\Delta t', 'Δt')
    content = content.replace(r'\approx', '≈')
    content = content.replace(r'\cdot', '·')
    content = content.replace(r'\oplus', '⊕')
    content = content.replace(r'\leftarrow', '←')
    content = content.replace(r'\rightarrow', '→')
    content = content.replace(r'\pm', '±')
    content = content.replace(r'\times', 'x')
    
    # Remove double dollars for block math equations if any exist
    content = re.sub(r'\$\$(.*?)\$\$', r'\1', content, flags=re.DOTALL)
    
    return content

def main():
    directory = "."
    for filename in os.listdir(directory):
        if filename.endswith(".md") and "Unit_" in filename:
            filepath = os.path.join(directory, filename)
            print(f"Cleaning LaTeX in {filename}...")
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                
            cleaned = clean_content(content)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(cleaned)

if __name__ == '__main__':
    main()
