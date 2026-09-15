import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';

const INITIAL_PROJECTS = [
    {
        title: 'AI Customer Support Dashboard',
        desc: 'AI-powered customer support dashboard with automated reply drafting and email replies.',
        longDesc: 'A full-stack customer support dashboard built with React and Django REST Framework. Support agents can manage customer tickets, generate AI-powered reply drafts using Groq’s API (Llama 3.3 70B via openai/gpt-oss-120b), send replies directly through SMTP, and resolve tickets. The backend uses SQLite by default and can be switched to PostgreSQL for production use. Designed with a clean ticket inbox, detailed ticket view, AI draft panel, and REST API.',
        tags: ['React', 'Django', 'DRF', 'Groq', 'PostgreSQL'],
        img: 'https://placehold.co/600x400/1e293b/ffffff?text=AI+Customer+Support',
        githubUrl: 'https://github.com/VelunaiTech/AI-customer-support.git'
    },
    {
        title: 'Uthaya Industrial Electro',
        desc: 'Full-stack platform for an industrial electronics business — product catalog, categories, material requests, and inquiries.',
        longDesc: 'A full-stack web application for an industrial electronics/hardware business. Built with React 19 (Vite) on the frontend and Django 5 + DRF on the backend. Features a browsable product catalog organized into categories, a material request system for bulk/custom orders, a contact system for managing customer inquiries, and dynamic hero/banner management for the homepage — all backed by a RESTful API.',
        tags: ['React 19', 'Vite', 'Django', 'DRF', 'SQLite'],
        img: 'https://placehold.co/600x400/1e293b/ffffff?text=IndustrialElectro',
        githubUrl: 'https://github.com/VelunaiTech/VelunaiTech-IndustrialElectro.git',
        demoUrl: 'https://uthaya-electro.vercel.app/'
    },
]

const DURATION = 900;
const EASE = 'cubic-bezier(.45,.05,.55,.95)';
const MAX_SLOTS = 3;

function ProjectFace({ project }) {
    const [imgError, setImgError] = useState(false);

    useEffect(() => {
        setImgError(false);
    }, [project && project.img]);

    if (!project) return null;
    const title = project.title || project.name;
    const tagsArray = Array.isArray(project.tags) ? project.tags : (typeof project.tech === 'string' ? project.tech.split(',').map(s => s.trim()).filter(Boolean) : []);
    const hasImage = !!project.img;
    
    return (
        <>
            {hasImage && (
                <img 
                    src={project.img} 
                    alt={title} 
                    style={{ display: imgError ? 'none' : 'block' }}
                    onError={() => setImgError(true)}
                    onLoad={() => setImgError(false)}
                />
            )}
            {(!hasImage || imgError) && (
                <div className="img-fallback">
                    <i className="fas fa-image"></i>
                </div>
            )}
            <div className="flip-body card-content card-padding-lg">
                <h4 className="card-title">{title}</h4>
                <p className="card-description">{project.desc}</p>
                <div className="flip-tags card-tags">
                    {tagsArray.map((t, idx) => (
                        <span key={idx} className="tech-tag">{t}</span>
                    ))}
                </div>
                <div className="flip-links card-footer">
                    {project.githubUrl && (
                        
                            <a href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <i className="fab fa-github mr-1"></i> Code
                        </a>
                    )}
                    {project.demoUrl && (
                        
                            <a href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <i className="fas fa-external-link-alt mr-1"></i> Demo
                        </a>
                    )}
                </div>
            </div>
        </>
    );
}

function Slot({ initialIndex, dir, projects, staggerDelay, slotCount, rotationEnabled, onClick }) {
    // Step by the actual number of rendered slots so each slot cycles
    // through a distinct subset of projects.
    const step = Math.min(slotCount, Math.max(1, projects.length));

    const [activeIndex, setActiveIndex] = useState(initialIndex % projects.length);
    const [incomingIndex, setIncomingIndex] = useState((initialIndex + step) % projects.length);
    const [phase, setPhase] = useState('idle');

    useEffect(() => {
        setActiveIndex(prev => prev % projects.length);
        setIncomingIndex(prev => prev % projects.length);
    }, [projects.length]);

    useEffect(() => {
        // No rotation when there aren't more projects than visible slots —
        // rotating would just shuffle the same items and create repeats.
        if (!rotationEnabled || projects.length <= 1) return undefined;

        let interval;
        let innerTimeout;

        const outerTimer = setTimeout(() => {
            interval = setInterval(() => {
                setPhase('animating');

                innerTimeout = setTimeout(() => {
                    setPhase('idle');
                    setActiveIndex(prev => (prev + step) % projects.length);
                    setIncomingIndex(prev => (prev + step) % projects.length);
                }, DURATION + 30);
            }, 3600);
        }, staggerDelay);

        return () => {
            clearTimeout(outerTimer);
            clearInterval(interval);
            clearTimeout(innerTimeout);
        };
    }, [staggerDelay, projects.length, step, rotationEnabled]);
    
    const activeTransform = phase === 'idle' 
        ? 'translateY(0%)' 
        : (dir === 'a' ? 'translateY(100%)' : 'translateY(-100%)');
        
    const incomingTransform = phase === 'idle'
        ? (dir === 'a' ? 'translateY(-100%)' : 'translateY(100%)')
        : 'translateY(0%)';
        
    const transition = phase === 'idle' ? 'none' : `transform ${DURATION}ms ${EASE}`;

    return (
        <div className="flip-slot" data-slot={initialIndex} data-dir={dir}>
            <div className="slide-viewport" onClick={() => onClick(projects[activeIndex])}>
                <div 
                    className="slide-face slide-current" 
                    style={{ transform: activeTransform, transition }}
                >
                    <ProjectFace project={projects[activeIndex]} />
                </div>
                <div 
                    className="slide-face slide-incoming" 
                    style={{ transform: incomingTransform, transition }}
                >
                    <ProjectFace project={projects[incomingIndex]} />
                </div>
            </div>
        </div>
    );
}

export default function Portfolio() {
    const { projects: contextProjects } = useData();
    const projects = contextProjects && contextProjects.length > 0 ? contextProjects : INITIAL_PROJECTS;

    // Only render as many slots as there are projects, capped at MAX_SLOTS,
    // so fewer than 3 projects never shows a duplicate at the same time.
    const slotCount = Math.min(MAX_SLOTS, projects.length);
    // Rotation only kicks in once there are more projects than visible slots.
    const rotationEnabled = projects.length > slotCount;
    const dirs = ['a', 'b', 'a'];
    const staggerDelays = [0, 220, 440];
    
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <section id="portfolio" className="section-padding bg-[#0b0e17]/30">
            <div className="site-container">
                <div className="section-header reveal">
                    <span className="text-primary font-semibold text-sm uppercase tracking-wider"><i className="fas fa-briefcase mr-1"></i> Our Work</span>
                    <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mt-2">Featured <span>Projects</span></h2>
                    <p className="text-gray-400 mt-4">A showcase of our best work across different industries and technologies.</p>
                </div>
                <div className="flip-board reveal card-gap-xl" id="projectsFlipBoard">
                    {Array.from({ length: slotCount }).map((_, i) => (
                        <Slot
                            key={i}
                            initialIndex={i}
                            dir={dirs[i]}
                            projects={projects}
                            staggerDelay={staggerDelays[i]}
                            slotCount={slotCount}
                            rotationEnabled={rotationEnabled}
                            onClick={setSelectedProject}
                        />
                    ))}
                </div>
                <p className="text-center text-gray-500 text-xs mt-5">
                    <i className="fas fa-mouse-pointer mr-1"></i> Auto-rotating showcase · click a panel to view details
                </p>
            </div>

            {selectedProject && (() => {
                const title = selectedProject.title || selectedProject.name;
                const tagsArray = Array.isArray(selectedProject.tags) ? selectedProject.tags : (typeof selectedProject.tech === 'string' ? selectedProject.tech.split(',').map(s => s.trim()).filter(Boolean) : []);
                return (
                <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
                    <div className="modal-content project-modal-content relative card-padding-lg" onClick={(e) => e.stopPropagation()}>
                        <span className="close-modal" onClick={() => setSelectedProject(null)}>&times;</span>
                        <img src={selectedProject.img} alt={title} />
                        <h3 className="card-title">{title}</h3>
                        <p className="card-description">{selectedProject.longDesc || selectedProject.desc}</p>
                        <div className="flip-tags card-tags">
                            {tagsArray.map((t, idx) => (
                                <span key={idx} className="tech-tag">{t}</span>
                            ))}
                        </div>
                        <div className="flip-links card-footer">
                            {selectedProject.githubUrl && (
                                <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-github mr-1"></i> View Code
                                </a>
                            )}
                            {selectedProject.demoUrl && (
                                <a href={selectedProject.demoUrl} target="_blank" rel="noopener noreferrer">
                                    <i className="fas fa-external-link-alt mr-1"></i> Live Demo
                                </a>
                            )}
                        </div>
                    </div>
                </div>
                );
            })()}
        </section>
    );
}