import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Mail, Linkedin, Twitter, Instagram } from 'lucide-react';
import { TEAM_MEMBERS, type TeamMember } from '../constants';

interface MeetTheTeamProps {
    onNavigate?: (pageId: string) => void;
}

const departments = ['All', 'Executive', 'A&R', 'Marketing', 'Operations', 'Creative', 'Publishing', 'Legal', 'Artist'];

const TeamCard: React.FC<{ member: TeamMember; index: number }> = ({ member, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
            className="group relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="glass-panel p-6 relative overflow-hidden h-full">
                {/* Gradient background on hover */}
                <div 
                    className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />

                <div className="relative z-10">
                    {/* Avatar */}
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-orange-500/30 group-hover:border-orange-500 transition-colors">
                        {member.image ? (
                            <img 
                                src={member.image} 
                                alt={member.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                                <Users className="w-8 h-8 text-gray-600" />
                            </div>
                        )}
                    </div>

                    {/* Name & Role */}
                    <div className="text-center mb-4">
                        <h3 className="text-lg font-bold text-[var(--text-color)] mb-1 group-hover:text-orange-500 transition-colors">
                            {member.name}
                        </h3>
                        <p className="text-xs font-semibold text-orange-500 uppercase tracking-wider mb-1">
                            {member.role}
                        </p>
                        <span className="inline-block px-3 py-1 text-[10px] font-medium text-gray-400 bg-white/5 border border-white/10 rounded-full">
                            {member.department}
                        </span>
                    </div>

                    {/* Bio */}
                    {member.bio && (
                        <p className="text-sm text-gray-400 text-center leading-relaxed">
                            {member.bio}
                        </p>
                    )}

                    {/* Social Links on Hover */}
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                        className="flex justify-center gap-3 mt-4 pt-4 border-t border-white/5"
                    >
                        <button className="p-2 rounded-full bg-white/5 hover:bg-orange-500/20 text-gray-400 hover:text-orange-500 transition-colors">
                            <Mail size={14} />
                        </button>
                        <button className="p-2 rounded-full bg-white/5 hover:bg-orange-500/20 text-gray-400 hover:text-orange-500 transition-colors">
                            <Linkedin size={14} />
                        </button>
                        <button className="p-2 rounded-full bg-white/5 hover:bg-orange-500/20 text-gray-400 hover:text-orange-500 transition-colors">
                            <Twitter size={14} />
                        </button>
                        <button className="p-2 rounded-full bg-white/5 hover:bg-orange-500/20 text-gray-400 hover:text-orange-500 transition-colors">
                            <Instagram size={14} />
                        </button>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export const MeetTheTeam: React.FC<MeetTheTeamProps> = () => {
    const [activeDepartment, setActiveDepartment] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredMembers = TEAM_MEMBERS.filter(member => {
        const matchesDepartment = activeDepartment === 'All' || member.department === activeDepartment;
        const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            member.role.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesDepartment && matchesSearch;
    });

    return (
        <div className="min-h-screen pt-24 pb-16">
            {/* Hero Section */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16 px-6"
            >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-red-500 mb-6 shadow-lg shadow-orange-500/30">
                    <Users className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-[var(--text-color)] tracking-tight mb-4">
                    Meet The Team
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-6" />
                <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
                    The passionate minds behind Love Renaissance. Meet the team that brings culture to the world.
                </p>
            </motion.div>

            {/* Filters */}
            <div className="max-w-7xl mx-auto px-6 mb-12">
                {/* Department Filters */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {departments.map((dept) => (
                        <button
                            key={dept}
                            onClick={() => setActiveDepartment(dept)}
                            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                                activeDepartment === dept 
                                    ? 'bg-orange-500 text-white' 
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                            }`}
                        >
                            {dept}
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="max-w-md mx-auto">
                    <input
                        type="text"
                        placeholder="Search team members..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 text-[var(--text-color)] placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                    />
                </div>
            </div>

            {/* Team Grid */}
            <div className="max-w-7xl mx-auto px-6">
                {filteredMembers.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredMembers.map((member, index) => (
                            <TeamCard key={member.name} member={member} index={index} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <p className="text-gray-500 text-lg">No team members found matching your criteria.</p>
                    </div>
                )}
            </div>

            {/* Stats Section */}
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="max-w-5xl mx-auto mt-20 px-6"
            >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center p-6 bg-white/5 border border-white/10">
                        <div className="text-4xl font-black text-orange-500 mb-2">24+</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider">Team Members</div>
                    </div>
                    <div className="text-center p-6 bg-white/5 border border-white/10">
                        <div className="text-4xl font-black text-orange-500 mb-2">5</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider">Founders</div>
                    </div>
                    <div className="text-center p-6 bg-white/5 border border-white/10">
                        <div className="text-4xl font-black text-orange-500 mb-2">9</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider">Departments</div>
                    </div>
                    <div className="text-center p-6 bg-white/5 border border-white/10">
                        <div className="text-4xl font-black text-orange-500 mb-2">13+</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider">Years Active</div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
