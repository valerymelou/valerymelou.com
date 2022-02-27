import { Project } from "./project";

describe('Project', () => {
  it('should construct a new project from data', () => {
    const data = {
      fields: {
        name: 'Test Project',
        description: 'This is a test project',
        demo: 'https://example.com',
        repository: 'https://example.com',
        preview: {
          fields: {
            title: 'Image',
            description: 'This is a test image',
            file: {
              url: 'https://example.com/image.jpg',
              details: {
                image: {
                  height: 100,
                  width: 100
                }
              }
            }
          }
        },
      },
      metadata: {
        tags: [
          {
            sys: {
              id: 'tag1'
            }
          }
        ]
      }
    }
    const project = new Project(data);
    expect(project.name).toBe('Test Project');
    expect(project.description).toBe('This is a test project');
    expect(project.demo).toBe('https://example.com');
    expect(project.repository).toBe('https://example.com');
  });
});
