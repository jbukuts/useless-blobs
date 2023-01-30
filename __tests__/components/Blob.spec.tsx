/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import UselessBlob from '../../components';

describe('<UselessBlob /> -', () => {
  it('can render the blob with no props', () => {
    render(<UselessBlob />);
    const blob = screen.getByTestId('useless-blob');
    expect(blob).toBeInTheDocument();

    expect(blob.attributes.getNamedItem('height')?.value).toBe('200');
    expect(blob.attributes.getNamedItem('width')?.value).toBe('200');

    const path = blob.children[0];
    expect(path.attributes.getNamedItem('fill')?.value).toBe('black');
  });

  it('can render the blob with partial props', () => {
    render(
      <UselessBlob
        fill='red'
        verts={20}
        width={500}
        height={300}
        smoothing={0.5}
        className='test-class'
        style={{ border: '1px solid black' }}
        pathStyle={{ transition: '.5s' }}
      />
    );
    const blob = screen.getByTestId('useless-blob');
    expect(blob).toBeInTheDocument();
    expect(blob.classList).toContain('test-class');
    expect(blob.style.border).toBe('1px solid black');

    expect(blob.attributes.getNamedItem('height')?.value).toBe('300');
    expect(blob.attributes.getNamedItem('width')?.value).toBe('500');

    const path = blob.children[0] as SVGElement;
    expect(path.attributes.getNamedItem('fill')?.value).toBe('red');
    expect(path.style.transition).toBe('.5s');
  });
});
