import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const CASE_CONCEPTS = [
      {
        idx: 0,
        concept_name: 'Abstention doctrine'        
      },
      {
        idx: 1,
        concept_name: 'Actio libera in causa'        
      },
      {
        idx: 2,
        concept_name: 'Agent of record'        
      },
      {
        idx: 3,
        concept_name: 'Alternative liability'        
      },
      {
        idx: 4,
        concept_name: 'Audi alteram partem'        
      },
      {
        idx: 5,
        concept_name: 'Beneficium inventarii'        
      },
      {
        idx: 6,
        concept_name: 'Boulevard rule'        
      },
      {
        idx: 7,
        concept_name: 'Brady disclosure'        
      },
      {
        idx: 8,
        concept_name: 'Burden of proof (law)'        
      },
      {
        idx: 9,
        concept_name: 'Commanding precedent'        
      },
      {
        idx: 10,
        concept_name: 'Comparative negligence'        
      },
      {
        idx: 11,
        concept_name: 'Constitutional convention (political custom)'        
      },
      {
        idx: 12,
        concept_name: 'Contributory negligence'        
      },
      {
        idx: 13,
        concept_name: 'Crumbling skull rule'        
      },
      {
        idx: 14,
        concept_name: 'Desuetude'        
      },
      {
        idx: 15,
        concept_name: 'Discovery doctrine'        
      },
      {
        idx: 16,
        concept_name: 'Doctrine of cash equivalence'        
      },
      {
        idx: 17,
        concept_name: 'Doctrine of chances'        
      },
      {
        idx: 18,
        concept_name: 'Doctrine of foreign equivalents'        
      },
      {
        idx: 19,
        concept_name: 'Doctrine of necessity'        
      },
      {
        idx: 20,
        concept_name: 'Double aspect doctrine'        
      },
      {
        idx: 21,
        concept_name: 'Duty of care'        
      },
      {
        idx: 22,
        concept_name: 'Duty to rescue'        
      },
      {
        idx: 23,
        concept_name: 'Economic substance'        
      },
      {
        idx: 24,
        concept_name: 'Emergency'        
      },
      {
        idx: 25,
        concept_name: 'Equal authenticity rule'        
      },
      {
        idx: 26,
        concept_name: 'Equity (law)'        
      },
      {
        idx: 27,
        concept_name: 'Erie doctrine'        
      },
      {
        idx: 28,
        concept_name: 'Essential facilities doctrine'        
      },
      {
        idx: 29,
        concept_name: 'Everything which is not forbidden is allowed'        
      },
      {
        idx: 30,
        concept_name: 'Ex turpi causa non oritur actio'        
      },
      {
        idx: 31,
        concept_name: 'Exhausted combination doctrine'        
      },
      {
        idx: 32,
        concept_name: 'Finality (law)'        
      },
      {
        idx: 33,
        concept_name: 'First-sale doctrine'        
      },
      {
        idx: 34,
        concept_name: 'Floodgates principle'        
      },
      {
        idx: 35,
        concept_name: 'FTC v. Dean Foods Co.'        
      },
      {
        idx: 36,
        concept_name: 'Functionality doctrine'        
      },
      {
        idx: 37,
        concept_name: 'Fundamental breach'        
      },
      {
        idx: 38,
        concept_name: 'Good-faith exception'        
      },
      {
        idx: 39,
        concept_name: 'Homestead principle'        
      },
      {
        idx: 40,
        concept_name: 'Imputation (law)'        
      },
      {
        idx: 41,
        concept_name: 'In loco parentis'        
      },
      {
        idx: 42,
        concept_name: 'Incorporation of international law'        
      },
      {
        idx: 43,
        concept_name: 'Independent source doctrine'        
      },
      {
        idx: 44,
        concept_name: 'Inequality of bargaining power'        
      },
      {
        idx: 45,
        concept_name: 'Inevitable disclosure'        
      },
      {
        idx: 46,
        concept_name: 'Jurisprudence constante'        
      },
      {
        idx: 47,
        concept_name: 'Laches (equity)'        
      },
      {
        idx: 48,
        concept_name: 'Last clear chance'        
      },
      {
        idx: 49,
        concept_name: 'Learned intermediary'        
      },
      {
        idx: 50,
        concept_name: 'Legality'        
      },
      {
        idx: 51,
        concept_name: 'Loss of chance in English law'        
      },
      {
        idx: 52,
        concept_name: 'Male captus bene detentus'        
      },
      {
        idx: 53,
        concept_name: 'Maxims of equity'        
      },
      {
        idx: 54,
        concept_name: 'Maxwellisation'        
      },
      {
        idx: 55,
        concept_name: 'Merger doctrine (civil procedure)'        
      },
      {
        idx: 56,
        concept_name: 'Mistake (contract law)'        
      },
      {
        idx: 57,
        concept_name: 'Mount Laurel doctrine'        
      },
      {
        idx: 58,
        concept_name: 'Negligence'        
      },
      {
        idx: 59,
        concept_name: 'Nemo iudex in causa sua'        
      },
      {
        idx: 60,
        concept_name: 'Non bis in idem'        
      },
      {
        idx: 61,
        concept_name: 'Nonacquiescence'        
      },
      {
        idx: 62,
        concept_name: 'Nondelegation doctrine'        
      },
      {
        idx: 63,
        concept_name: 'Nulla poena sine culpa'        
      },
      {
        idx: 64,
        concept_name: 'Open mines doctrine'        
      },
      {
        idx: 65,
        concept_name: 'Pacta sunt servanda'        
      },
      {
        idx: 66,
        concept_name: 'Paraphrasing of copyrighted material'        
      },
      {
        idx: 67,
        concept_name: 'Peremptory norm'        
      },
      {
        idx: 68,
        concept_name: 'Physical proximity doctrine'        
      },
      {
        idx: 69,
        concept_name: 'Plain meaning rule'        
      },
      {
        idx: 70,
        concept_name: 'Preparation and attempt'        
      },
      {
        idx: 71,
        concept_name: 'Presumption'        
      },
      {
        idx: 72,
        concept_name: 'Presumption (Catholic canon law)'        
      },
      {
        idx: 73,
        concept_name: 'Presumption of innocence'        
      },
      {
        idx: 74,
        concept_name: 'Principle of legality in French criminal law'        
      },
      {
        idx: 75,
        concept_name: 'Privity of contract'        
      },
      {
        idx: 76,
        concept_name: 'Proportionality (law)'        
      },
      {
        idx: 77,
        concept_name: 'Prosecutorial discretion'        
      },
      {
        idx: 78,
        concept_name: 'Purcell principle'        
      },
      {
        idx: 79,
        concept_name: 'Qualified immunity'        
      },
      {
        idx: 80,
        concept_name: 'Qui facit per alium facit per se'        
      },
      {
        idx: 81,
        concept_name: 'Reasonable doubt'        
      },
      {
        idx: 82,
        concept_name: 'Remoteness in English law'        
      },
      {
        idx: 83,
        concept_name: 'Res ipsa loquitur'        
      },
      {
        idx: 84,
        concept_name: 'Res judicata'        
      },
      {
        idx: 85,
        concept_name: 'Reverse doctrine of equivalents'        
      },
      {
        idx: 86,
        concept_name: 'Safe harbor (law)'        
      },
      {
        idx: 87,
        concept_name: 'Spider in the web doctrine'        
      },
      {
        idx: 88,
        concept_name: 'Substance over form'        
      },
      {
        idx: 89,
        concept_name: 'Substantial certainty doctrine'        
      },
      {
        idx: 90,
        concept_name: 'Sufficient similarity'        
      },
      {
        idx: 91,
        concept_name: 'Tolling (law)'        
      },
      {
        idx: 92,
        concept_name: 'Transnational child protection'        
      },
      {
        idx: 93,
        concept_name: 'Unaccompanied minor'        
      },
      {
        idx: 94,
        concept_name: 'Unconscionability'        
      },
      {
        idx: 95,
        concept_name: 'Undue hardship'        
      },
      {
        idx: 96,
        concept_name: 'United States v. American Bell Telephone Co.'        
      },
      {
        idx: 97,
        concept_name: 'Valid when made'        
      },
      {
        idx: 98,
        concept_name: 'Vicarious liability'        
      },
      {
        idx: 99,
        concept_name: 'Volenti non fit injuria'        
      },
      {
        idx: 100,
        concept_name: 'Wrongdoing'        
      }
]


export default function Cases() {
  const navigate = useNavigate();

  const [searchQuery, setQuery] = useState('');
  const [filteredCases, setFilteredCases] = useState(CASE_CONCEPTS);
  
  const filterCases = (query) => {
    const processedQuery = query.toLowerCase();
    const results = CASE_CONCEPTS.filter(concept =>
      concept.concept_name.toLowerCase().includes(processedQuery)
    );
    setFilteredCases(results);
  };

  const handleQueryChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    filterCases(value);
  };

  const handleCaseSelect = (doctrine_idx) => {
    navigate(`/Simulation?index=${doctrine_idx}`)
  }

  return (
        <div className="cases-page p-6">
            <h1 className="text-3xl font-bold mb-6">🏛️ Legal Case Concepts</h1>

            <div className="flex mb-8 space-x-3">
                <input
                    type="text"
                    placeholder="Search case concepts..."
                    value={searchQuery}
                    onChange={handleQueryChange}
                    className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <hr className="mb-8" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCases.length > 0 ? (
                    filteredCases.map((concept) => (
                        <div 
                            key={concept.idx} 
                            className="p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition duration-150 cursor-pointer"
                        >
                            <button 
                              onClick={() => handleCaseSelect(concept.idx)}
                            >
                              <p className="font-medium text-lg text-gray-800">
                                  {concept.concept_name}
                              </p>
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 col-span-full">No concepts found for the query: "{searchQuery}".</p>
                )}
            </div>
        </div>
    );
}